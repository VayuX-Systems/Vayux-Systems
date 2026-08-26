#!/usr/bin/env python3
"""
VayuX Smart Git Activity & Commit History Generator
----------------------------------------------------
Generates a realistic, randomized commit history across the past 365 days (1 year).
Features:
 - Realistic commit messages (Conventional Commits: feat, fix, chore, docs, refactor, perf)
 - Realistic human-like schedule: higher probability on weekdays, lower on weekends
 - Randomized commit frequencies (0 to 7 commits per day)
 - Natural working hours (09:00 to 23:00) with random timestamps
 - Dry-run mode for previewing before applying
 - Optional auto-push to GitHub
"""

import os
import sys
import random
import argparse
import subprocess
from datetime import datetime, timedelta

# Realistic conventional commit pool
COMMIT_MESSAGES = [
    # Features
    "feat: implement adaptive telemetry ingestion pipeline",
    "feat: add role-based permission validation for SOC analyst dashboard",
    "feat: integrate real-time IoC signature matching engine",
    "feat: support Snort and Suricata automated rule compilation",
    "feat: add zero-trust sandbox containment trigger",
    "feat: implement DPDP Act 2023 compliance audit trail exporter",
    "feat: add encrypted websocket transport for live telemetry stream",
    "feat: introduce dark mode high-contrast token palette",
    "feat: add multi-factor authentication challenge for incident dispatch",
    "feat: implement automated forensic memory acquisition hook",
    "feat: add threat actor MITRE ATT&CK matrix visualization",
    "feat: support CSV and JSON forensic report exports",
    "feat: add interactive 6-stage autonomous loop visualizer",
    "feat: create micro-training simulation dispatch engine",
    "feat: add bookmark persistence for threat intelligence advisories",
    
    # Fixes
    "fix: resolve race condition in websocket reconnection loop",
    "fix: correct timestamp drift in telemetry buffer logs",
    "fix: handle null pointer on unauthenticated webhook payload",
    "fix: prevent z-index clipping on elevated hover tooltips",
    "fix: resolve mobile layout viewport overflow in hero animation",
    "fix: normalize egress IP address parser for IPv6 CIDR blocks",
    "fix: patch XSS sanitization in markdown advisory reader",
    "fix: fix memory leak in background cron heartbeat listener",
    "fix: resolve state sync bug across multi-tab bookmark sessions",
    "fix: correct SLA threshold calculation for Sev-1 incident tickets",
    
    # Refactoring & Improvements
    "refactor: modularize telemetry inspection console components",
    "refactor: optimize orbital CSS animation transforms for 60fps",
    "refactor: streamline incident response intake form validation",
    "refactor: consolidate mock telemetry fixtures into typed schemas",
    "refactor: decouple client-side hash router logic from screen views",
    "refactor: improve bundle chunking for lazy loaded screens",
    "refactor: convert inline SVG filters to shared defs library",
    
    # Performance & Optimization
    "perf: debounce rapid filter inputs on intelligence advisory hub",
    "perf: lazy load heavy SVG animation assets on initial paint",
    "perf: reduce main thread blocking time during telemetry parsing",
    "perf: optimize Tailwind CSS token compilation tree",
    
    # Documentation & Maintenance
    "docs: update API architecture and telemetry format specification",
    "docs: document 4-step SOC engineering pipeline workflow",
    "docs: add setup instructions and Vercel deployment guidelines",
    "docs: update CERT-In 6-hour disclosure compliance guidelines",
    "chore: update dependencies and typescript definitions",
    "chore: configure vercel.json SPA rewrites and asset headers",
    "chore: clean up deprecated CSS variables and unused imports",
    "test: add unit tests for incident containment state machine",
    "test: verify telemetry buffer integrity under high-volume load",
    "style: polish glassmorphism backdrop blurs and focus rings"
]

def run_command(command, env=None):
    """Executes a shell command and returns output."""
    result = subprocess.run(
        command,
        shell=True,
        capture_output=True,
        text=True,
        env=env or os.environ.copy()
    )
    return result.returncode == 0, result.stdout.strip(), result.stderr.strip()

def check_git_repo():
    """Ensures script is running inside a valid Git repository."""
    success, _, _ = run_command("git rev-parse --is-inside-work-tree")
    if not success:
        print("[ERROR] Current directory is not a Git repository!")
        print("Please initialize git first: git init")
        sys.exit(1)

def generate_random_time(base_date):
    """Generates a realistic randomized hour, minute, and second during active hours."""
    # Peak probability between 9 AM and 11 PM
    hour_weights = [
        0, 0, 0, 0, 0, 0,   # 00:00 - 05:59 (rare)
        1, 2, 4,            # 06:00 - 08:59 (early)
        8, 10, 12, 10, 9,   # 09:00 - 13:59 (working day peak)
        10, 11, 12, 11, 10, # 14:00 - 18:59 (afternoon peak)
        8, 7, 5, 3          # 19:00 - 23:59 (evening)
    ]
    hours = list(range(24))
    hour = random.choices(hours, weights=hour_weights, k=1)[0]
    minute = random.randint(0, 59)
    second = random.randint(0, 59)
    
    commit_datetime = base_date.replace(hour=hour, minute=minute, second=second)
    return commit_datetime

def generate_commits(days=365, max_per_day=5, weekday_prob=0.82, weekend_prob=0.35, dry_run=False, push=False):
    check_git_repo()
    
    log_file = "activity.log"
    today = datetime.now()
    start_date = today - timedelta(days=days)
    
    total_commits = 0
    planned_commits = []

    print("=" * 65)
    print(f"  VayuX Smart Git Activity Generator")
    print(f"  Timeline : {start_date.strftime('%Y-%m-%d')}  -->  {today.strftime('%Y-%m-%d')} ({days} days)")
    print(f"  Max/Day  : Up to {max_per_day} commits | Dry Run: {dry_run}")
    print("=" * 65)

    # 1. Plan commits day by day
    for day_offset in range(days + 1):
        current_day = start_date + timedelta(days=day_offset)
        is_weekend = current_day.weekday() >= 5  # 5 = Saturday, 6 = Sunday

        # Determine if this day should have activity
        active_prob = weekend_prob if is_weekend else weekday_prob
        if random.random() > active_prob:
            continue  # Natural rest / skipped day

        # Number of commits for this active day (skewed towards 1-3, occasional 4-6)
        daily_count = random.choices(
            range(1, max_per_day + 1),
            weights=[35, 30, 20, 10, 5][:max_per_day],
            k=1
        )[0]

        # Generate timestamps for each commit on this day in chronological order
        day_timestamps = sorted([generate_random_time(current_day) for _ in range(daily_count)])
        
        for dt in day_timestamps:
            msg = random.choice(COMMIT_MESSAGES)
            planned_commits.append((dt, msg))

    total_commits = len(planned_commits)
    print(f"[INFO] Planned a total of {total_commits} natural commits across {days} days.\n")

    if dry_run:
        print("[DRY-RUN] Preview of first 10 commits:")
        for dt, msg in planned_commits[:10]:
            print(f"  • {dt.strftime('%Y-%m-%d %H:%M:%S')}  |  {msg}")
        print(f"\n[DRY-RUN] ... and {total_commits - 10} more commits.")
        print("[DRY-RUN] No changes were written to git history.")
        return

    # 2. Execute commits
    print("[EXECUTION] Generating commits...")
    env = os.environ.copy()

    for idx, (dt, msg) in enumerate(planned_commits, 1):
        iso_date = dt.strftime("%Y-%m-%dT%H:%M:%S")
        env["GIT_AUTHOR_DATE"] = iso_date
        env["GIT_COMMITTER_DATE"] = iso_date

        # Append small unique payload to activity file
        with open(log_file, "a", encoding="utf-8") as f:
            f.write(f"[{iso_date}] {msg} (id:{random.randint(10000, 99999)})\n")

        # Stage file
        run_command(f"git add {log_file}")

        # Commit with custom backdated environment
        success, _, err = run_command(f'git commit -m "{msg}"', env=env)
        if not success and "nothing to commit" not in err:
            print(f"[ERROR] Failed at commit #{idx}: {err}")
            break

        # Progress indicator
        if idx % 25 == 0 or idx == total_commits:
            progress = (idx / total_commits) * 100
            print(f"  Progress: {idx}/{total_commits} commits ({progress:.1f}%) -> {dt.strftime('%Y-%m-%d')}")

    print("\n" + "=" * 65)
    print(f"[SUCCESS] Successfully generated {total_commits} commits into Git history!")
    print("=" * 65)

    # 3. Optional Push
    if push:
        print("\n[PUSH] Pushing commits to remote repository...")
        success, branch, _ = run_command("git branch --show-current")
        branch = branch or "main"
        push_success, out, err = run_command(f"git push origin {branch}")
        if push_success:
            print(f"[SUCCESS] Pushed all commits to origin/{branch}!")
        else:
            print(f"[WARNING] Push failed: {err}")
            print(f"You can manually push with: git push origin {branch}")
    else:
        print("\nTo push these commits to GitHub, run:")
        print("   git push origin main")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate natural randomized Git commit history for the past 1 year.")
    parser.add_argument("--days", type=int, default=365, help="Number of days in the past to span (default: 365)")
    parser.add_argument("--max-per-day", type=int, default=5, help="Max commits allowed per active day (default: 5)")
    parser.add_argument("--dry-run", action="store_true", help="Preview planned commits without applying them")
    parser.add_argument("--push", action="store_true", help="Automatically git push to origin after generation")

    args = parser.parse_args()
    generate_commits(
        days=args.days,
        max_per_day=args.max_per_day,
        dry_run=args.dry_run,
        push=args.push
    )

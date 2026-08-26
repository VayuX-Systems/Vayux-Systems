# VayuX Smart Git Activity & Commit History Generator

A Python utility that generates a natural, randomized commit history across the past **365 days (1 full year)**.

## Key Features

- **Realistic Conventional Commits**: Uses realistic messages (`feat:`, `fix:`, `refactor:`, `perf:`, `docs:`, `chore:`).
- **Human-like Schedule**:
  - Higher activity probability on weekdays (~82%), lower on weekends (~35%).
  - Natural skipped days/rest days so the commit graph looks organic.
  - Realistic daytime working hours (9:00 AM to 11:00 PM) with randomized minutes and seconds.
  - Natural volume: 1 to 5 commits per active day.
- **Dry-Run Preview**: Preview the planned timeline before committing anything.
- **Safe & Non-Destructive**: Appends to a local `activity.log` file without touching your source code files.

---

## How to Run

Navigate to the project root or the generator folder:

### 1. Preview First (Dry Run - Recommended)
See the planned commit dates and messages without altering Git history:
```bash
python git-commit-generator/generate_history.py --dry-run
```

### 2. Generate 1 Year of Commits (365 Days)
```bash
python git-commit-generator/generate_history.py
```

### 3. Generate & Auto-Push directly to GitHub
```bash
python git-commit-generator/generate_history.py --push
```

---

## Custom Options & Flags

| Flag | Description | Default |
| :--- | :--- | :--- |
| `--days <number>` | Number of days in the past to span | `365` |
| `--max-per-day <number>` | Maximum commits generated per active day | `5` |
| `--dry-run` | Preview commit plan without writing to Git | `False` |
| `--push` | Automatically `git push` to remote branch after generation | `False` |

### Examples:

**Generate commits for the last 6 months (180 days):**
```bash
python git-commit-generator/generate_history.py --days 180
```

**Generate up to 8 commits per day over 1 year:**
```bash
python git-commit-generator/generate_history.py --days 365 --max-per-day 8
```

---

## Manual Push to GitHub

If you ran without `--push`, you can push your newly generated history to GitHub anytime:

```bash
git push origin main
```
*(Replace `main` with your active branch name if different)*

---
name: create-skill
user-invocable: true
description: "Create or update a workspace skill definition file that guides the user through agent customization workflows. Use when the user wants to build a new SKILL.md for this repository."
---

# Create Skill

## When to use

- The user wants a reusable workspace skill for building VS Code agent customization files.
- The user needs a step-by-step workflow for creating `.instructions.md`, `.prompt.md`, `.agent.md`, or `SKILL.md` files.
- The user wants a skill scoped to this repository's `.github` customization layout.

## What this skill does

1. Reviews the repository structure and existing customization files.
2. Determines whether the change belongs in workspace scope (`.github/`) or user scope.
3. Chooses the appropriate primitive based on the request:
   - `SKILL.md` for multi-step workflow guidance
   - `*.prompt.md` for single-command prompt tasks
   - `*.instructions.md` for persistent code-style or repository guidance
   - `*.agent.md` for a custom agent with tool restrictions or multi-stage workflows
4. Creates the new skill file under `.github/skills/<skill-name>/SKILL.md`.
5. Validates YAML frontmatter and confirms the file location.

## Quality checklist

- [ ] The skill file includes valid YAML frontmatter with `name`, `user-invocable`, and `description`.
- [ ] The `description` is phrased for discovery by the assistant.
- [ ] The skill matches the repository's existing customization structure.
- [ ] The guidance is concise, actionable, and workspace-specific.
- [ ] The skill includes a small example or usage note when appropriate.

## Example prompts to try

- "Create a workspace skill for adding new Playwright test troubleshooting workflows."
- "Help me build a SKILL.md that guides users to update `.github/agents` files."
- "Add a skill for choosing between prompt, instructions, and agent customization files."

## Next customization ideas

- Add a workspace `*.instructions.md` for Playwright test troubleshooting conventions.
- Create a `*.prompt.md` for recommending npm scripts in this repo.
- Add a custom agent under `.github/agents` for step-by-step Playwright migration support.

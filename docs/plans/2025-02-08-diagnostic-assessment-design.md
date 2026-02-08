# Diagnostic Assessment Tool — Design

## Overview

A 20-question, multiple-choice diagnostic assessment at `straffonmath.com/diagnostic`. Fully client-side. No login, no backend. Serves as both a placement tool and a lead generation entry point.

Students start immediately with zero friction, work through 20 questions ordered easy-to-hard, then enter parent email + student name + grade to unlock their placement recommendation. That submission goes to Tally with hidden fields carrying the score and recommended track.

## Content & Structure

### Skill Areas (6)
- Number sense & operations (fractions, decimals, integers)
- Ratios & proportional reasoning
- Expressions & equations
- Geometry basics (area, angles, coordinate plane)
- Data & statistics
- Multi-step problem solving

### Difficulty Progression
- Questions 1-7: **Build-level** (grade 6 core). Fractions, basic ratios, simple expressions.
- Questions 8-14: **Momentum-level** (grade 7 core). Proportions, two-step equations, geometry reasoning.
- Questions 15-20: **Ascend-level** (grade 8+ core). Systems-thinking, multi-step geometry, abstract reasoning.

### Answer Design
- 4 choices per question
- Wrong answers are diagnostic distractors reflecting common misconceptions (e.g. forgetting common denominators, sign errors with negatives)

### Placement Logic
- 0-7 correct: **Build** track recommended
- 8-14 correct: **Momentum** track recommended
- 15-20 correct: **Ascend** track recommended

## User Experience Flow

### Step 1: Landing
Student arrives at `/diagnostic`. Clean branded page with Straffon Math logo, headline ("Find your level"), short blurb ("20 questions. 10-15 minutes. See which track fits your child."), and a single "Start the Diagnostic" button.

### Step 2: The Assessment
- One question per screen
- Slim progress bar at top (1/20, 2/20...)
- Question centered, large, readable
- Four answer choices as clickable cards
- Selection highlights briefly, auto-advances after short delay
- No back button, no timer

### Step 3: The Gate
After question 20, transition screen: "Your results are ready." Tally form embed asking for parent email, student first name, and grade level. Hidden fields pass raw score and recommended track.

### Step 4: The Results
Displayed on the same page after form submission:
- Recommended track name and description
- Visual showing placement on Build > Momentum > Ascend spectrum
- CTA: "Join the Priority List" linking to existing Tally signup

## Visual Design

- White background, generous whitespace
- Straffon Math logo top-left, small. No navigation links.
- Progress bar: teal (#2EC4B6), thin, across the top
- Question text: Fraunces (display font), large
- Answer cards: DM Sans, subtle border, hover state, teal highlight on selection
- Results screen: teal track badge, navy (#0B1222) text
- Same color system as main site

## Technical Approach

- Single standalone file: `diagnostic.html` in project root
- All CSS in a `<style>` block, no dependency on main stylesheets
- All JS inline: question bank, scoring logic, flow control
- Question bank: JSON array (question text, four choices, correct answer index)
- Tally embed for email gate, hidden fields populated via JS
- Math rendering: clean HTML/CSS (superscripts, fraction layouts with flexbox), no external libraries
- No build tools, no framework. Pure HTML/CSS/JS.

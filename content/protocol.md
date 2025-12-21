---
title: "SOP: Your First Reproduction"
date: "2025-12-21"
description: "The standard operating procedure for reproducing a research paper."
author: "The Warlord"
github_repo: "https://github.com/Project-Aquarius-White"
---

# The Aquarius Protocol

> "You don't truly understand a system until you can rebuild it from scratch."

## Phase 1: Intake & De-Noise (Day 1)

**Objective:** Identify what actually matters. 

Most papers are 80% academic signaling and 20% innovation. Your job is to find the 20%.

1. **Read Abstract & Conclusion first.** Understand the claim.
2. **Scan the figures.** The architecture diagram is your map.
3. **Ignore the related work.** It's irrelevant for reproduction.
4. **Identify the core mechanism.** Is it a new loss function? A new layer? A training trick?

## Phase 2: Whiteboard Simulation (Days 2-3)

**Objective:** Mathematics into comprehensible logic.

Do not touch the keyboard.

1. Take the equations from the paper.
2. Write them out by hand.
3. Trace the tensor shapes. If $X$ is $(B, T, D)$, what is $Y$?
4. If the shapes don't match, you don't understand it yet.

## Phase 3: Lean Build (Days 4-7)

**Objective:** Logic into working code.

Start blank. No forks.

```python
import torch
import torch.nn as nn

class TheThing(nn.Module):
    def __init__(self):
        super().__init__()
        # TODO: Build the thing
```

- **Unit test every component.** Does the attention head actually attend?
- **Overfit a single batch.** If it can't learn one sample, it's broken.

## Phase 4: Deployment & Telemetry (Days 8-11)

**Objective:** Validate against real data.

Running on MNIST doesn't count.

1. Train on a representative dataset.
2. Log everything to WandB/Tensorboard.
3. reproduce the main table from the paper.

## Phase 5: Documentation & Evangelism (Days 12-14)

**Objective:** Make it accessible.

If you built it but didn't document it, you wasted 2 weeks.

- **README:** The single most important file.
- **Blog Post:** Tell the story of the struggle.
- **Twitter Thread:** Share the win.

---

**[Return to Queue](#)**

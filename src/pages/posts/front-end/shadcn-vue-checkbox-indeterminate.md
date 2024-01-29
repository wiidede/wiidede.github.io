---
title: shadcn vue checkbox indeterminate 复选框中间状态
date: 2024-01-29T16:54:49+08:00
id: shadcn-vue-checkbox-indeterminate
categories:
  - 前端
tags:
  - Vue
---

[[toc]]

# shadcn vue checkbox indeterminate 复选框中间状态

Radix UI Checkbox's `checked` field has a state called "indeterminate". But It has no effect.

So we need to add the icon while the state is indeterminate.

import icon

`import { Check, Minus } from 'lucide-vue-next'`

use icon

````vue
<CheckboxIndicator class="group/indicator h-full w-full flex items-center justify-center text-current">
  <Check class="h-4 w-4 group-[[data-state=indeterminate]]/indicator:hidden" />
  <Minus class="text-primary h-4 w-4 group-[[data-state=checked]]/indicator:hidden" />
</CheckboxIndicator>
```

```vue
<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue'
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue'
import { Check, Minus } from 'lucide-vue-next'
import { cn } from '~/lib/utils'

const props = defineProps<CheckboxRootProps>()
const emits = defineEmits<CheckboxRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="
      cn('peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
         $attrs.class ?? '')"
  >
    <CheckboxIndicator class="group/indicator h-full w-full flex items-center justify-center text-current">
      <Check class="h-4 w-4 group-[[data-state=indeterminate]]/indicator:hidden" />
      <Minus class="text-primary h-4 w-4 group-[[data-state=checked]]/indicator:hidden" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
````

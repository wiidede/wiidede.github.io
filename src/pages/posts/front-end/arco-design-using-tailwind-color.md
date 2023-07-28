---
title: arco-design快速使用tailwind的颜色、unocss动态颜色
date: 2023-05-23 10:32:59
id: arco-design-using-tailwind-color
categories:
  - 前端
tags:
  - ArcoDesign
  - Tailwind
  - UnoCSS
---

[[toc]]

# arco-design快速使用tailwind的颜色、unocss动态颜色

## arco-design快速使用tailwind的颜色

arco design的颜色是它自己定义的，但是我们可以使用tailwind的颜色，这样配合tailwind的颜色工具，可以更方便的使用颜色。

因为是Vue3的项目，所以使用的是unocss的tailwind预设。然后

然后就是css文件，这里我们使用`uno-{color}`的形式，只要使用了`uno-{color}`这个类，arco design的primary等颜色就会被替换成tailwind的颜色。

```css
/* .uno-slate, .uno-gray, .uno-zinc, .uno-neutral, .uno-stone, .uno-red, .uno-orange, .uno-amber, .uno-yellow, .uno-lime, .uno-green, .uno-emerald, .uno-teal, .uno-cyan, .uno-sky, .uno-blue, .uno-indigo, .uno-violet, .uno-purple, .uno-fuchsia, .uno-pink, .uno-rose { */
[class*="uno-"] {
  --color-text-1: rgb(var(--primary-9));
  --color-text-2: rgb(var(--primary-7));
  --color-text-3: rgb(var(--primary-5));
  --color-text-4: rgb(var(--primary-3));
  --color-fill-1: rgb(var(--primary-1));
  --color-fill-2: rgb(var(--primary-2));
  --color-fill-3: rgb(var(--primary-3));
  --color-fill-4: rgb(var(--primary-4));
  --color-primary-light-1: rgb(var(--primary-1));
  --color-primary-light-2: rgb(var(--primary-2));
  --color-primary-light-3: rgb(var(--primary-3));
  --color-primary-light-4: rgb(var(--primary-4));
  --color-secondary: rgb(var(--primary-2));
  --color-secondary-hover: rgb(var(--primary-3));
  --color-secondary-active: rgb(var(--primary-4));
  --color-secondary-disabled: rgb(var(--primary-1));
  --color-neutral-1: rgb(var(--gray-1));
  --color-neutral-2: rgb(var(--primary-1));
  --color-neutral-3: rgb(var(--primary-2));
  --color-neutral-4: rgb(var(--primary-3));
  --color-neutral-5: rgb(var(--primary-4));
  --color-neutral-6: rgb(var(--primary-5));
  --color-neutral-7: rgb(var(--primary-6));
  --color-neutral-8: rgb(var(--primary-7));
  --color-neutral-9: rgb(var(--primary-8));
  --color-neutral-10: rgb(var(--primary-9));
}

.uno-slate {
  --primary-1: 248, 250, 252;
  --primary-2: 241, 245, 249;
  --primary-3: 226, 232, 240;
  --primary-4: 203, 213, 225;
  --primary-5: 148, 163, 184;
  --primary-6: 100, 116, 139;
  --primary-7: 71, 85, 105;
  --primary-8: 51, 65, 89;
  --primary-9: 30, 41, 59;
  --primary-10: 15, 23, 42;
}

.uno-gray {
  --primary-1: 249, 250, 251;
  --primary-2: 243, 244, 246;
  --primary-3: 229, 231, 235;
  --primary-4: 209, 213, 219;
  --primary-5: 156, 163, 175;
  --primary-6: 107, 114, 128;
  --primary-7: 75, 85, 99;
  --primary-8: 55, 65, 81;
  --primary-9: 31, 41, 55;
  --primary-10: 17, 24, 39;
}

.uno-zinc {
  --primary-1: 250, 250, 250;
  --primary-2: 244, 244, 245;
  --primary-3: 228, 228, 231;
  --primary-4: 212, 212, 216;
  --primary-5: 161, 161, 170;
  --primary-6: 113, 113, 122;
  --primary-7: 82, 82, 91;
  --primary-8: 63, 63, 70;
  --primary-9: 39, 39, 42;
  --primary-10: 24, 24, 27;
}

.uno-neutral {
  --primary-1: 250, 250, 250;
  --primary-2: 245, 245, 245;
  --primary-3: 229, 229, 229;
  --primary-4: 212, 212, 212;
  --primary-5: 163, 163, 163;
  --primary-6: 115, 115, 115;
  --primary-7: 82, 82, 82;
  --primary-8: 64, 64, 64;
  --primary-9: 38, 38, 38;
  --primary-10: 23, 23, 23;
}

.uno-stone {
  --primary-1: 250, 250, 249;
  --primary-2: 245, 245, 244;
  --primary-3: 231, 229, 228;
  --primary-4: 214, 211, 209;
  --primary-5: 168, 162, 158;
  --primary-6: 120, 113, 108;
  --primary-7: 87, 83, 78;
  --primary-8: 68, 64, 60;
  --primary-9: 41, 37, 36;
  --primary-10: 28, 25, 23;
}

.uno-red {
  --primary-1: 254, 242, 242;
  --primary-2: 254, 226, 226;
  --primary-3: 254, 202, 202;
  --primary-4: 252, 165, 165;
  --primary-5: 248, 113, 113;
  --primary-6: 239, 68, 68;
  --primary-7: 220, 38, 38;
  --primary-8: 185, 28, 28;
  --primary-9: 153, 27, 27;
  --primary-10: 127, 29, 29;
}

.uno-orange {
  --primary-1: 255, 247, 237;
  --primary-2: 255, 237, 213;
  --primary-3: 254, 215, 170;
  --primary-4: 253, 186, 116;
  --primary-5: 251, 146, 60;
  --primary-6: 249, 115, 22;
  --primary-7: 234, 88, 12;
  --primary-8: 194, 65, 12;
  --primary-9: 154, 52, 18;
  --primary-10: 124, 45, 18;
}

.uno-amber {
  --primary-1: 255, 251, 235;
  --primary-2: 254, 243, 199;
  --primary-3: 253, 230, 138;
  --primary-4: 252, 211, 77;
  --primary-5: 251, 191, 36;
  --primary-6: 245, 158, 11;
  --primary-7: 217, 119, 6;
  --primary-8: 180, 83, 9;
  --primary-9: 146, 64, 14;
  --primary-10: 120, 53, 15;
}

.uno-yellow {
  --primary-1: 254, 252, 232;
  --primary-2: 254, 249, 195;
  --primary-3: 254, 240, 138;
  --primary-4: 253, 224, 71;
  --primary-5: 250, 204, 21;
  --primary-6: 234, 179, 8;
  --primary-7: 202, 138, 4;
  --primary-8: 161, 98, 7;
  --primary-9: 133, 77, 14;
  --primary-10: 113, 63, 18;
}

.uno-lime {
  --primary-1: 247, 254, 231;
  --primary-2: 236, 252, 203;
  --primary-3: 217, 249, 157;
  --primary-4: 190, 242, 100;
  --primary-5: 163, 230, 53;
  --primary-6: 132, 204, 22;
  --primary-7: 101, 163, 13;
  --primary-8: 77, 124, 15;
  --primary-9: 63, 98, 18;
  --primary-10: 54, 83, 20;
}

.uno-green {
  --primary-1: 240, 253, 244;
  --primary-2: 220, 252, 231;
  --primary-3: 187, 247, 208;
  --primary-4: 134, 239, 172;
  --primary-5: 74, 222, 128;
  --primary-6: 34, 197, 94;
  --primary-7: 22, 163, 84;
  --primary-8: 21, 128, 83;
  --primary-9: 22, 101, 52;
  --primary-10: 20, 83, 45;
}

.uno-emerald {
  --primary-1: 236, 253, 245;
  --primary-2: 209, 250, 229;
  --primary-3: 167, 243, 208;
  --primary-4: 110, 231, 183;
  --primary-5: 52, 211, 153;
  --primary-6: 16, 185, 129;
  --primary-7: 5, 150, 105;
  --primary-8: 4, 120, 87;
  --primary-9: 6, 95, 70;
  --primary-10: 6, 78, 59;
}

.uno-teal {
  --primary-1: 240, 253, 250;
  --primary-2: 204, 251, 241;
  --primary-3: 153, 246, 228;
  --primary-4: 94, 234, 212;
  --primary-5: 45, 212, 191;
  --primary-6: 20, 184, 166;
  --primary-7: 13, 148, 136;
  --primary-8: 15, 118, 110;
  --primary-9: 17, 94, 84;
  --primary-10: 19, 78, 74;
}

.uno-cyan {
  --primary-1: 236, 254, 255;
  --primary-2: 207, 250, 254;
  --primary-3: 165, 243, 252;
  --primary-4: 103, 232, 249;
  --primary-5: 34, 211, 238;
  --primary-6: 6, 182, 212;
  --primary-7: 8, 145, 178;
  --primary-8: 14, 116, 144;
  --primary-9: 21, 94, 117;
  --primary-10: 22, 78, 99;
}

.uno-sky {
  --primary-1: 240, 249, 255;
  --primary-2: 224, 242, 254;
  --primary-3: 186, 230, 253;
  --primary-4: 125, 211, 252;
  --primary-5: 56, 189, 248;
  --primary-6: 14, 165, 233;
  --primary-7: 2, 132, 199;
  --primary-8: 3, 105, 161;
  --primary-9: 7, 89, 133;
  --primary-10: 12, 74, 110;
}

.uno-blue {
  --primary-1: 239, 246, 255;
  --primary-2: 219, 234, 254;
  --primary-3: 191, 219, 254;
  --primary-4: 147, 197, 253;
  --primary-5: 96, 165, 250;
  --primary-6: 59, 130, 246;
  --primary-7: 37, 99, 235;
  --primary-8: 29, 78, 216;
  --primary-9: 30, 64, 175;
  --primary-10: 30, 58, 138;
}

.uno-indigo {
  --primary-1: 238, 242, 255;
  --primary-2: 224, 231, 255;
  --primary-3: 199, 210, 254;
  --primary-4: 165, 180, 252;
  --primary-5: 129, 140, 248;
  --primary-6: 99, 102, 241;
  --primary-7: 79, 58, 225;
  --primary-8: 67, 56, 202;
  --primary-9: 55, 48, 163;
  --primary-10: 49, 46, 129;
}

.uno-violet {
  --primary-1: 245, 243, 255;
  --primary-2: 237, 233, 254;
  --primary-3: 221, 214, 254;
  --primary-4: 196, 181, 253;
  --primary-5: 167, 139, 250;
  --primary-6: 139, 86, 246;
  --primary-7: 124, 62, 224;
  --primary-8: 109, 40, 217;
  --primary-9: 91, 33, 182;
  --primary-10: 76, 29, 149;
}

.uno-purple {
  --primary-1: 250, 245, 255;
  --primary-2: 243, 232, 255;
  --primary-3: 233, 213, 255;
  --primary-4: 216, 180, 254;
  --primary-5: 192, 132, 252;
  --primary-6: 168, 85, 247;
  --primary-7: 155, 51, 234;
  --primary-8: 126, 34, 181;
  --primary-9: 107, 33, 168;
  --primary-10: 88, 28, 135;
}

.uno-fuchsia {
  --primary-1: 253, 244, 255;
  --primary-2: 250, 232, 255;
  --primary-3: 245, 208, 254;
  --primary-4: 240, 171, 252;
  --primary-5: 232, 121, 249;
  --primary-6: 217, 86, 239;
  --primary-7: 192, 38, 195;
  --primary-8: 162, 28, 175;
  --primary-9: 134, 24, 143;
  --primary-10: 112, 26, 117;
}

.uno-pink {
  --primary-1: 253, 242, 248;
  --primary-2: 252, 231, 243;
  --primary-3: 251, 207, 232;
  --primary-4: 249, 168, 212;
  --primary-5: 244, 114, 182;
  --primary-6: 244, 72, 153;
  --primary-7: 219, 39, 119;
  --primary-8: 190, 24, 93;
  --primary-9: 157, 23, 77;
  --primary-10: 131, 24, 67;
}

.uno-rose {
  --primary-1: 255, 241, 242;
  --primary-2: 255, 230, 230;
  --primary-3: 254, 205, 211;
  --primary-4: 253, 164, 175;
  --primary-5: 251, 113, 133;
  --primary-6: 244, 63, 94;
  --primary-7: 225, 29, 72;
  --primary-8: 190, 18, 60;
  --primary-9: 159, 18, 57;
  --primary-10: 136, 19, 55;
}
```

## unocss动态颜色

```ts
// @unocss-include

export function useColors() {
  const colorList = [
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    // 'rose',
    // 'slate',
    // 'gray',
    // 'zinc',
    // 'neutral',
    // 'stone',
  ]

  const randomColor = () => {
    return colorList[Math.floor(Math.random() * colorList.length)]
  }
  return {
    colorList,
    randomColor,
  }
}

/*
["slate","gray","zinc","neutral","stone","red","orange","amber","yellow","lime","green","emerald","teal","cyan","sky","blue","indigo","violet","purple","fuchsia","pink","rose"].map(c => `text-${c} text-${c}-50 text-${c}-100 text-${c}-200 text-${c}-300 text-${c}-400 text-${c}-500 text-${c}-600 text-${c}-700 text-${c}-800 text-${c}-900\nbg-${c} bg-${c}-50 bg-${c}-100 bg-${c}-200 bg-${c}-300 bg-${c}-400 bg-${c}-500 bg-${c}-600 bg-${c}-700 bg-${c}-800 bg-${c}-900\n`).join('')

text-slate text-slate-50 text-slate-100 text-slate-200 text-slate-300 text-slate-400 text-slate-500 text-slate-600 text-slate-700 text-slate-800 text-slate-900
bg-slate bg-slate-50 bg-slate-100 bg-slate-200 bg-slate-300 bg-slate-400 bg-slate-500 bg-slate-600 bg-slate-700 bg-slate-800 bg-slate-900
text-gray text-gray-50 text-gray-100 text-gray-200 text-gray-300 text-gray-400 text-gray-500 text-gray-600 text-gray-700 text-gray-800 text-gray-900
bg-gray bg-gray-50 bg-gray-100 bg-gray-200 bg-gray-300 bg-gray-400 bg-gray-500 bg-gray-600 bg-gray-700 bg-gray-800 bg-gray-900
text-zinc text-zinc-50 text-zinc-100 text-zinc-200 text-zinc-300 text-zinc-400 text-zinc-500 text-zinc-600 text-zinc-700 text-zinc-800 text-zinc-900
bg-zinc bg-zinc-50 bg-zinc-100 bg-zinc-200 bg-zinc-300 bg-zinc-400 bg-zinc-500 bg-zinc-600 bg-zinc-700 bg-zinc-800 bg-zinc-900
text-neutral text-neutral-50 text-neutral-100 text-neutral-200 text-neutral-300 text-neutral-400 text-neutral-500 text-neutral-600 text-neutral-700 text-neutral-800 text-neutral-900
bg-neutral bg-neutral-50 bg-neutral-100 bg-neutral-200 bg-neutral-300 bg-neutral-400 bg-neutral-500 bg-neutral-600 bg-neutral-700 bg-neutral-800 bg-neutral-900
text-stone text-stone-50 text-stone-100 text-stone-200 text-stone-300 text-stone-400 text-stone-500 text-stone-600 text-stone-700 text-stone-800 text-stone-900
bg-stone bg-stone-50 bg-stone-100 bg-stone-200 bg-stone-300 bg-stone-400 bg-stone-500 bg-stone-600 bg-stone-700 bg-stone-800 bg-stone-900
text-red text-red-50 text-red-100 text-red-200 text-red-300 text-red-400 text-red-500 text-red-600 text-red-700 text-red-800 text-red-900
bg-red bg-red-50 bg-red-100 bg-red-200 bg-red-300 bg-red-400 bg-red-500 bg-red-600 bg-red-700 bg-red-800 bg-red-900
text-orange text-orange-50 text-orange-100 text-orange-200 text-orange-300 text-orange-400 text-orange-500 text-orange-600 text-orange-700 text-orange-800 text-orange-900
bg-orange bg-orange-50 bg-orange-100 bg-orange-200 bg-orange-300 bg-orange-400 bg-orange-500 bg-orange-600 bg-orange-700 bg-orange-800 bg-orange-900
text-amber text-amber-50 text-amber-100 text-amber-200 text-amber-300 text-amber-400 text-amber-500 text-amber-600 text-amber-700 text-amber-800 text-amber-900
bg-amber bg-amber-50 bg-amber-100 bg-amber-200 bg-amber-300 bg-amber-400 bg-amber-500 bg-amber-600 bg-amber-700 bg-amber-800 bg-amber-900
text-yellow text-yellow-50 text-yellow-100 text-yellow-200 text-yellow-300 text-yellow-400 text-yellow-500 text-yellow-600 text-yellow-700 text-yellow-800 text-yellow-900
bg-yellow bg-yellow-50 bg-yellow-100 bg-yellow-200 bg-yellow-300 bg-yellow-400 bg-yellow-500 bg-yellow-600 bg-yellow-700 bg-yellow-800 bg-yellow-900
text-lime text-lime-50 text-lime-100 text-lime-200 text-lime-300 text-lime-400 text-lime-500 text-lime-600 text-lime-700 text-lime-800 text-lime-900
bg-lime bg-lime-50 bg-lime-100 bg-lime-200 bg-lime-300 bg-lime-400 bg-lime-500 bg-lime-600 bg-lime-700 bg-lime-800 bg-lime-900
text-green text-green-50 text-green-100 text-green-200 text-green-300 text-green-400 text-green-500 text-green-600 text-green-700 text-green-800 text-green-900
bg-green bg-green-50 bg-green-100 bg-green-200 bg-green-300 bg-green-400 bg-green-500 bg-green-600 bg-green-700 bg-green-800 bg-green-900
text-emerald text-emerald-50 text-emerald-100 text-emerald-200 text-emerald-300 text-emerald-400 text-emerald-500 text-emerald-600 text-emerald-700 text-emerald-800 text-emerald-900
bg-emerald bg-emerald-50 bg-emerald-100 bg-emerald-200 bg-emerald-300 bg-emerald-400 bg-emerald-500 bg-emerald-600 bg-emerald-700 bg-emerald-800 bg-emerald-900
text-teal text-teal-50 text-teal-100 text-teal-200 text-teal-300 text-teal-400 text-teal-500 text-teal-600 text-teal-700 text-teal-800 text-teal-900
bg-teal bg-teal-50 bg-teal-100 bg-teal-200 bg-teal-300 bg-teal-400 bg-teal-500 bg-teal-600 bg-teal-700 bg-teal-800 bg-teal-900
text-cyan text-cyan-50 text-cyan-100 text-cyan-200 text-cyan-300 text-cyan-400 text-cyan-500 text-cyan-600 text-cyan-700 text-cyan-800 text-cyan-900
bg-cyan bg-cyan-50 bg-cyan-100 bg-cyan-200 bg-cyan-300 bg-cyan-400 bg-cyan-500 bg-cyan-600 bg-cyan-700 bg-cyan-800 bg-cyan-900
text-sky text-sky-50 text-sky-100 text-sky-200 text-sky-300 text-sky-400 text-sky-500 text-sky-600 text-sky-700 text-sky-800 text-sky-900
bg-sky bg-sky-50 bg-sky-100 bg-sky-200 bg-sky-300 bg-sky-400 bg-sky-500 bg-sky-600 bg-sky-700 bg-sky-800 bg-sky-900
text-blue text-blue-50 text-blue-100 text-blue-200 text-blue-300 text-blue-400 text-blue-500 text-blue-600 text-blue-700 text-blue-800 text-blue-900
bg-blue bg-blue-50 bg-blue-100 bg-blue-200 bg-blue-300 bg-blue-400 bg-blue-500 bg-blue-600 bg-blue-700 bg-blue-800 bg-blue-900
text-indigo text-indigo-50 text-indigo-100 text-indigo-200 text-indigo-300 text-indigo-400 text-indigo-500 text-indigo-600 text-indigo-700 text-indigo-800 text-indigo-900
bg-indigo bg-indigo-50 bg-indigo-100 bg-indigo-200 bg-indigo-300 bg-indigo-400 bg-indigo-500 bg-indigo-600 bg-indigo-700 bg-indigo-800 bg-indigo-900
text-violet text-violet-50 text-violet-100 text-violet-200 text-violet-300 text-violet-400 text-violet-500 text-violet-600 text-violet-700 text-violet-800 text-violet-900
bg-violet bg-violet-50 bg-violet-100 bg-violet-200 bg-violet-300 bg-violet-400 bg-violet-500 bg-violet-600 bg-violet-700 bg-violet-800 bg-violet-900
text-purple text-purple-50 text-purple-100 text-purple-200 text-purple-300 text-purple-400 text-purple-500 text-purple-600 text-purple-700 text-purple-800 text-purple-900
bg-purple bg-purple-50 bg-purple-100 bg-purple-200 bg-purple-300 bg-purple-400 bg-purple-500 bg-purple-600 bg-purple-700 bg-purple-800 bg-purple-900
text-fuchsia text-fuchsia-50 text-fuchsia-100 text-fuchsia-200 text-fuchsia-300 text-fuchsia-400 text-fuchsia-500 text-fuchsia-600 text-fuchsia-700 text-fuchsia-800 text-fuchsia-900
bg-fuchsia bg-fuchsia-50 bg-fuchsia-100 bg-fuchsia-200 bg-fuchsia-300 bg-fuchsia-400 bg-fuchsia-500 bg-fuchsia-600 bg-fuchsia-700 bg-fuchsia-800 bg-fuchsia-900
text-pink text-pink-50 text-pink-100 text-pink-200 text-pink-300 text-pink-400 text-pink-500 text-pink-600 text-pink-700 text-pink-800 text-pink-900
bg-pink bg-pink-50 bg-pink-100 bg-pink-200 bg-pink-300 bg-pink-400 bg-pink-500 bg-pink-600 bg-pink-700 bg-pink-800 bg-pink-900
text-rose text-rose-50 text-rose-100 text-rose-200 text-rose-300 text-rose-400 text-rose-500 text-rose-600 text-rose-700 text-rose-800 text-rose-900
bg-rose bg-rose-50 bg-rose-100 bg-rose-200 bg-rose-300 bg-rose-400 bg-rose-500 bg-rose-600 bg-rose-700 bg-rose-800 bg-rose-900
*/
```

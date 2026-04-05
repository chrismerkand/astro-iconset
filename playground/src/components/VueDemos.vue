<script setup lang="ts">
import Icon from "astro-iconset/vue";
import iconAdjustment from "../icons/adjustment.svg?icon";
import iconFromAssets from "../assets/import-only.svg?icon";

defineProps<{ demo: string }>();
</script>

<template>
  <!-- Registry · local -->
  <ul v-if="demo === 'registry-local'" class="matrix" role="list">
    <li class="matrix__row">
      <span class="matrix__label">short name</span>
      <span class="matrix__sample"><Icon name="adjustment" :size="24" /></span>
      <code class="matrix__code">name="adjustment"</code>
    </li>
    <li class="matrix__row">
      <span class="matrix__label">second name</span>
      <span class="matrix__sample"><Icon name="annotation" :size="24" /></span>
      <code class="matrix__code">name="annotation"</code>
    </li>
    <li class="matrix__row">
      <span class="matrix__label">brand: prefix</span>
      <span class="matrix__sample"><Icon name="brand:mark" :size="24" /></span>
      <code class="matrix__code">name="brand:mark"</code>
    </li>
    <li class="matrix__row">
      <span class="matrix__label">ui: prefix</span>
      <span class="matrix__sample"><Icon name="ui:glyph" :size="24" /></span>
      <code class="matrix__code">name="ui:glyph"</code>
    </li>
  </ul>

  <!-- Registry · Iconify -->
  <ul v-else-if="demo === 'registry-iconify'" class="matrix" role="list">
    <li class="matrix__row">
      <span class="matrix__label">bi:stars</span>
      <span class="matrix__sample"><Icon name="bi:stars" :size="24" /></span>
      <code class="matrix__code">name="bi:stars"</code>
    </li>
    <li class="matrix__row">
      <span class="matrix__label">ic:baseline-account-box</span>
      <span class="matrix__sample"><Icon name="ic:baseline-account-box" :size="24" /></span>
      <code class="matrix__code">name="ic:baseline-account-box"</code>
    </li>
    <li class="matrix__row">
      <span class="matrix__label">ri:home-line</span>
      <span class="matrix__sample"><Icon name="ri:home-line" :size="24" /></span>
      <code class="matrix__code">name="ri:home-line"</code>
    </li>
    <li class="matrix__row">
      <span class="matrix__label">fe:building</span>
      <span class="matrix__sample"><Icon name="fe:building" :size="24" /></span>
      <code class="matrix__code">name="fe:building"</code>
    </li>
  </ul>

  <!-- Import · ?icon -->
  <ul v-else-if="demo === 'import-icon'" class="matrix" role="list">
    <li class="matrix__row">
      <span class="matrix__label">same as registry</span>
      <span class="matrix__sample"><Icon :icon="iconAdjustment" :size="24" /></span>
      <code class="matrix__code">:icon="iconAdjustment"</code>
    </li>
    <li class="matrix__row">
      <span class="matrix__label">assets-only file</span>
      <span class="matrix__sample"><Icon :icon="iconFromAssets" :size="24" /></span>
      <code class="matrix__code">:icon="iconFromAssets"</code>
    </li>
  </ul>

  <!-- Sizing -->
  <div v-else-if="demo === 'sizing'" class="compare compare--sizing">
    <figure class="compare__card">
      <Icon name="bi:stars" :size="24" />
      <figcaption>:size="24"</figcaption>
    </figure>
    <figure class="compare__card">
      <Icon name="bi:stars" :size="48" />
      <figcaption>:size="48"</figcaption>
    </figure>
    <figure class="compare__card">
      <Icon name="bi:stars" :width="64" :height="32" />
      <figcaption>width=64 height=32</figcaption>
    </figure>
  </div>

  <!-- A11y -->
  <div v-else-if="demo === 'a11y'" class="compare">
    <figure class="compare__card compare__card--wide">
      <Icon name="bi:stars" :size="48" title="Favourites" desc="A star icon representing the favourites feature" />
      <figcaption>
        <code>title="Favourites"</code> + <code>desc="…"</code>
        <br /><small>(inspect SVG — &lt;title&gt; and &lt;desc&gt; present)</small>
      </figcaption>
    </figure>
  </div>

  <!-- Styling -->
  <div v-else-if="demo === 'styling'" class="compare">
    <figure class="compare__card">
      <Icon name="bi:stars" :size="32" />
      <figcaption><code>[data-icon="bi:stars"]</code></figcaption>
    </figure>
    <figure class="compare__card">
      <Icon name="adjustment" :size="32" />
      <figcaption><code>[data-icon="adjustment"]</code></figcaption>
    </figure>
  </div>

  <!-- No sprite dedup -->
  <div v-else-if="demo === 'no-sprite'" class="compare">
    <figure class="compare__card">
      <Icon name="ic:baseline-star" :size="32" />
      <figcaption>instance 1</figcaption>
    </figure>
    <figure class="compare__card">
      <Icon name="ic:baseline-star" :size="32" />
      <figcaption>instance 2</figcaption>
    </figure>
    <figure class="compare__card">
      <Icon name="ic:baseline-star" :size="32" />
      <figcaption>instance 3</figcaption>
    </figure>
  </div>

  <!-- Tailwind -->
  <ul v-else-if="demo === 'tailwind'" class="matrix" role="list">
    <li class="matrix__row">
      <span class="matrix__label">text colour</span>
      <span class="matrix__sample"><Icon name="bi:stars" class="size-6 text-yellow-400" /></span>
      <code class="matrix__code">class="size-6 text-yellow-400"</code>
    </li>
    <li class="matrix__row">
      <span class="matrix__label">hover colour</span>
      <span class="matrix__sample"><Icon name="ri:home-line" class="size-6 text-sky-400 hover:text-emerald-400 transition-colors" /></span>
      <code class="matrix__code">hover:text-emerald-400 transition-colors</code>
    </li>
    <li class="matrix__row">
      <span class="matrix__label">size utility</span>
      <span class="matrix__sample"><Icon name="ic:baseline-account-box" class="size-10 text-violet-400" /></span>
      <code class="matrix__code">class="size-10 text-violet-400"</code>
    </li>
    <li class="matrix__row">
      <span class="matrix__label">opacity</span>
      <span class="matrix__sample"><Icon name="bi:stars" class="size-6 text-yellow-400 opacity-30" /></span>
      <code class="matrix__code">class="… opacity-30"</code>
    </li>
  </ul>
</template>

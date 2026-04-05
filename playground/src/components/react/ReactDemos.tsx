/** @jsxImportSource react */
import Icon from "astro-iconset/react";
// ?icon imports resolved at build time by the Vite plugin
import iconAdjustment from "../../icons/adjustment.svg?icon";
import iconFromAssets from "../../assets/import-only.svg?icon";

// ─── Registry · local ────────────────────────────────────────────────────────

export function RegistryLocalDemo() {
  return (
    <ul className="matrix" role="list">
      <li className="matrix__row">
        <span className="matrix__label">short name</span>
        <span className="matrix__sample"><Icon name="adjustment" size={24} /></span>
        <code className="matrix__code">name="adjustment"</code>
      </li>
      <li className="matrix__row">
        <span className="matrix__label">second name</span>
        <span className="matrix__sample"><Icon name="annotation" size={24} /></span>
        <code className="matrix__code">name="annotation"</code>
      </li>
      <li className="matrix__row">
        <span className="matrix__label">brand: prefix</span>
        <span className="matrix__sample"><Icon name="brand:mark" size={24} /></span>
        <code className="matrix__code">name="brand:mark"</code>
      </li>
      <li className="matrix__row">
        <span className="matrix__label">ui: prefix</span>
        <span className="matrix__sample"><Icon name="ui:glyph" size={24} /></span>
        <code className="matrix__code">name="ui:glyph"</code>
      </li>
    </ul>
  );
}

// ─── Registry · Iconify ──────────────────────────────────────────────────────

export function RegistryIconifyDemo() {
  return (
    <ul className="matrix" role="list">
      <li className="matrix__row">
        <span className="matrix__label">bi:stars</span>
        <span className="matrix__sample"><Icon name="bi:stars" size={24} /></span>
        <code className="matrix__code">name="bi:stars"</code>
      </li>
      <li className="matrix__row">
        <span className="matrix__label">ic:baseline-account-box</span>
        <span className="matrix__sample"><Icon name="ic:baseline-account-box" size={24} /></span>
        <code className="matrix__code">name="ic:baseline-account-box"</code>
      </li>
      <li className="matrix__row">
        <span className="matrix__label">ri:home-line</span>
        <span className="matrix__sample"><Icon name="ri:home-line" size={24} /></span>
        <code className="matrix__code">name="ri:home-line"</code>
      </li>
      <li className="matrix__row">
        <span className="matrix__label">fe:building</span>
        <span className="matrix__sample"><Icon name="fe:building" size={24} /></span>
        <code className="matrix__code">name="fe:building"</code>
      </li>
    </ul>
  );
}

// ─── Import · ?icon ──────────────────────────────────────────────────────────

export function ImportIconDemo() {
  return (
    <ul className="matrix" role="list">
      <li className="matrix__row">
        <span className="matrix__label">same as registry</span>
        <span className="matrix__sample"><Icon icon={iconAdjustment} size={24} /></span>
        <code className="matrix__code">icon={"{iconAdjustment}"}</code>
      </li>
      <li className="matrix__row">
        <span className="matrix__label">assets-only file</span>
        <span className="matrix__sample"><Icon icon={iconFromAssets} size={24} /></span>
        <code className="matrix__code">icon={"{iconFromAssets}"}</code>
      </li>
    </ul>
  );
}

// ─── Sizing ──────────────────────────────────────────────────────────────────

export function SizingDemo() {
  return (
    <div className="compare compare--sizing">
      <figure className="compare__card">
        <Icon name="bi:stars" size={24} />
        <figcaption>size={"{24}"}</figcaption>
      </figure>
      <figure className="compare__card">
        <Icon name="bi:stars" size={48} />
        <figcaption>size={"{48}"}</figcaption>
      </figure>
      <figure className="compare__card">
        <Icon name="bi:stars" width={64} height={32} />
        <figcaption>width=64 height=32</figcaption>
      </figure>
    </div>
  );
}

// ─── Title & desc (a11y) ─────────────────────────────────────────────────────

export function A11yDemo() {
  return (
    <div className="compare">
      <figure className="compare__card compare__card--wide">
        <Icon name="bi:stars" size={48} title="Favourites" desc="A star icon representing the favourites feature" />
        <figcaption>
          <code>title="Favourites"</code> + <code>desc="…"</code>
          <br />
          <small>(inspect SVG — &lt;title&gt; and &lt;desc&gt; present)</small>
        </figcaption>
      </figure>
    </div>
  );
}

// ─── CSS targeting via data-icon ─────────────────────────────────────────────

export function StylingDemo() {
  return (
    <div className="compare">
      <figure className="compare__card">
        <Icon name="bi:stars" size={32} />
        <figcaption><code>[data-icon="bi:stars"]</code></figcaption>
      </figure>
      <figure className="compare__card">
        <Icon name="adjustment" size={32} />
        <figcaption><code>[data-icon="adjustment"]</code></figcaption>
      </figure>
    </div>
  );
}

// ─── No sprite deduplication ─────────────────────────────────────────────────

export function DuplicateDemo() {
  return (
    <div className="compare">
      <figure className="compare__card">
        <Icon name="ic:baseline-star" size={32} />
        <figcaption>instance 1</figcaption>
      </figure>
      <figure className="compare__card">
        <Icon name="ic:baseline-star" size={32} />
        <figcaption>instance 2</figcaption>
      </figure>
      <figure className="compare__card">
        <Icon name="ic:baseline-star" size={32} />
        <figcaption>instance 3</figcaption>
      </figure>
    </div>
  );
}

// ─── Hydration modes ─────────────────────────────────────────────────────────
// These are plain React components — the hydration directive (client:load etc.)
// is applied in the .astro page when each is mounted as an island.

export function HydrationLoadDemo() {
  return (
    <figure className="compare__card">
      <Icon name="ri:home-line" size={32} />
      <figcaption><code>client:load</code></figcaption>
    </figure>
  );
}

export function HydrationVisibleDemo() {
  return (
    <figure className="compare__card">
      <Icon name="ri:home-line" size={32} />
      <figcaption><code>client:visible</code></figcaption>
    </figure>
  );
}

export function HydrationOnlyDemo() {
  return (
    <figure className="compare__card">
      <Icon name="ri:home-line" size={32} />
      <figcaption><code>client:only="react"</code></figcaption>
    </figure>
  );
}

// ─── Tailwind ────────────────────────────────────────────────────────────────

export function TailwindDemo() {
  return (
    <ul className="matrix" role="list">
      <li className="matrix__row">
        <span className="matrix__label">text colour</span>
        <span className="matrix__sample">
          <Icon name="bi:stars" className="size-6 text-yellow-400" />
        </span>
        <code className="matrix__code">className="size-6 text-yellow-400"</code>
      </li>
      <li className="matrix__row">
        <span className="matrix__label">hover colour</span>
        <span className="matrix__sample">
          <Icon name="ri:home-line" className="size-6 text-sky-400 hover:text-emerald-400 transition-colors" />
        </span>
        <code className="matrix__code">hover:text-emerald-400 transition-colors</code>
      </li>
      <li className="matrix__row">
        <span className="matrix__label">size utility</span>
        <span className="matrix__sample">
          <Icon name="ic:baseline-account-box" className="size-10 text-violet-400" />
        </span>
        <code className="matrix__code">className="size-10 text-violet-400"</code>
      </li>
      <li className="matrix__row">
        <span className="matrix__label">w / h utilities</span>
        <span className="matrix__sample">
          <Icon name="fe:building" className="w-10 h-6 text-rose-400" />
        </span>
        <code className="matrix__code">className="w-10 h-6 text-rose-400"</code>
      </li>
      <li className="matrix__row">
        <span className="matrix__label">opacity</span>
        <span className="matrix__sample">
          <Icon name="bi:stars" className="size-6 text-yellow-400 opacity-30" />
        </span>
        <code className="matrix__code">className="… opacity-30"</code>
      </li>
    </ul>
  );
}

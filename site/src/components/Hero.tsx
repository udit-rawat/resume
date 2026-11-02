import { contact } from '../data'
import { Rich } from './Rich'
import { useClock } from './useClock'

/* Hero: a mikes.cv style log block, then the pitch. Speaks to clients and recruiters at once. */
export function Hero() {
  const time = useClock()
  return (
    <section className="ground-wash px-4 pt-28 pb-10 sm:px-8 sm:pt-36">
      <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-10">
        <div>
        <dl className="mono grid w-max grid-cols-[auto_auto] gap-x-5 gap-y-0.5 border-l border-dotted border-ink-faint pl-3 text-[11.5px] leading-[1.6] text-ink-soft">
          <dt className="text-ink-faint">based</dt>
          <dd>New Delhi, IN</dd>
          <dt className="text-ink-faint">coords</dt>
          <dd>28.6139° N, 77.2090° E</dd>
          <dt className="text-ink-faint">local</dt>
          <dd>
            {time} IST, GMT+5:30
          </dd>
          <dt className="text-ink-faint">status</dt>
          <dd className="flex items-center gap-1.5">
            <span className="inline-block size-1.5 rounded-full bg-[#2f9e5b]" aria-hidden="true" />
            taking freelance projects, open to contracts
          </dd>
        </dl>

        <h1 className="mt-10 max-w-[15ch] text-[clamp(2.6rem,7.4vw,5.6rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-balance">
          AI systems and websites, built to hold up.
        </h1>

        <p className="mt-7 max-w-[56ch] text-[clamp(1.05rem,1.6vw,1.22rem)] leading-[1.55] text-ink-soft">
          <Rich
            text="I'm Udit, an AI engineer in New Delhi. I shipped a diabetes model that runs offline on a Snapdragon 680 phone, cut a health startup's LLM bill by [[54%::One LiteLLM gateway with model routing across 65+ agentic workflows in 5+ services, at TapHealth. Private codebase.]], and built misaanjh.com end to end. I take on website and AI projects directly, and I'm open to contract roles."
          />
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={contact.projectMail}
            className="rounded-full bg-ink px-5 py-3 text-[15px] font-medium text-ground transition-colors hover:bg-black"
          >
            Start a project
          </a>
          <a href="#work" className="text-[15px] font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
            See the work
          </a>
          <a
            href={contact.resume}
            download
            className="text-[15px] text-ink-soft underline decoration-ink/20 underline-offset-4 hover:text-ink"
          >
            Download resume (PDF)
          </a>
        </div>
        </div>

        <figure className="relative mx-auto w-full max-w-[400px] self-end lg:mx-0 lg:-mb-6">
          <img
            src="/art/school-of-athens.webp"
            alt="Raphael's School of Athens: Plato and Aristotle walk forward under the arches, surrounded by philosophers deep in conversation."
            width={400}
            height={540}
            className="block h-auto w-full rounded-[6px] shadow-[0_1px_2px_rgb(0_0_0/0.12),0_18px_40px_-12px_rgb(40_30_20/0.35)] select-none"
            draggable={false}
          />
          <figcaption className="mt-4 text-[13.5px] leading-[1.55] text-ink-soft">
            Curiosity never stops, and neither does my passion to explore the unknown in the field I love most.
            <span className="mono mt-1.5 block text-[11px] text-ink-faint">Raphael, The School of Athens, 1511</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

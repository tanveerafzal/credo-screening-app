#!/opt/homebrew/opt/python@3.14/bin/python3.14
"""
Records the redesign's micro-interactions against the dev server on :3200.

    python3.14 screenshots/motion/capture.py            # all clips + checks
    python3.14 screenshots/motion/capture.py dropdown   # one clip

Outputs land next to this file: <clip>.webm (Playwright video), <clip>.gif
(ffmpeg, cropped where a detail matters), and checks.json with the
reduced-motion and layout-shift results. The contact form is never submitted:
POSTs to /api/contact are aborted at the network layer and counted.
"""
import json
import shutil
import subprocess
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = 'http://localhost:3200'
OUT = Path(__file__).resolve().parent
DESKTOP = {'width': 1280, 'height': 800}
PHONE = {'width': 390, 'height': 844}


def gif(src: Path, dst: Path, crop: str | None = None, fps: int = 24, width: int | None = None, start: float = 0):
    """webm -> gif with a generated palette. crop is ffmpeg w:h:x:y; start trims lead-in seconds."""
    filters = []
    if crop:
        filters.append(f'crop={crop}')
    filters.append(f'fps={fps}')
    if width:
        filters.append(f'scale={width}:-1:flags=lanczos')
    chain = ','.join(filters)
    vf = f'{chain},split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=5'
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', str(start), '-i', str(src), '-vf', vf, '-loop', '0', str(dst)], check=True)


class Clip:
    """One recording context per clip so each video maps to one interaction."""

    def __init__(self, browser, name: str, viewport=DESKTOP, reduced_motion: str | None = None, **ctx):
        self.browser, self.name, self.viewport, self.reduced_motion, self.ctx = browser, name, viewport, reduced_motion, ctx

    def __enter__(self):
        self.context = self.browser.new_context(
            viewport=self.viewport,
            record_video_dir=str(OUT / '_raw'),
            record_video_size=self.viewport,
            **self.ctx,
        )
        self.t0 = time.monotonic()  # the video timeline starts with the context
        self.page = self.context.new_page()
        if self.reduced_motion:
            self.page.emulate_media(reduced_motion=self.reduced_motion)
        # Safety net: the contact form must never reach the API.
        self.blocked = []
        self.page.route('**/api/contact', lambda route: (self.blocked.append(route.request.url), route.abort()))
        return self

    def elapsed(self) -> float:
        """Seconds since recording began; use as the gif `start` once the subject is framed."""
        return time.monotonic() - self.t0

    def __exit__(self, *exc):
        video = self.page.video
        self.context.close()
        if video:
            src = Path(video.path())
            dst = OUT / f'{self.name}.webm'
            shutil.move(src, dst)
            self.path = dst


def settle(page, ms=400):
    page.wait_for_timeout(ms)


def go(page, path, wait='networkidle'):
    page.goto(f'{BASE}{path}', wait_until=wait)
    page.wait_for_timeout(300)


# ---------------------------------------------------------------- clips

def clip_button(browser):
    with Clip(browser, 'button-hover-press') as c:
        p = c.page
        go(p, '/')
        btn = p.get_by_role('link', name='Try Free Screening')
        # Press without leaving the page: Next's Link skips navigation when the click is default-prevented.
        btn.evaluate('a => a.addEventListener("click", (e) => e.preventDefault(), true)')
        box = btn.bounding_box()
        p.mouse.move(box['x'] - 120, box['y'] + box['height'] / 2)
        settle(p, 300)
        start = c.elapsed()
        settle(p, 300)
        p.mouse.move(box['x'] + box['width'] / 2, box['y'] + box['height'] / 2, steps=12)
        settle(p, 700)
        p.mouse.down()
        settle(p, 260)
        p.mouse.up()
        settle(p, 500)
        p.mouse.move(box['x'] - 120, box['y'] + box['height'] / 2, steps=10)
        settle(p, 600)
        # secondary pill + a text link, same pass
        sec = p.get_by_role('link', name='View Data Sources')
        b2 = sec.bounding_box()
        p.mouse.move(b2['x'] + b2['width'] / 2, b2['y'] + b2['height'] / 2, steps=12)
        settle(p, 600)
        p.mouse.move(b2['x'] + b2['width'] / 2, b2['y'] + 120, steps=8)
        settle(p, 500)
        region = (int(box['x']) - 40, int(box['y']) - 40)
    gif(c.path, OUT / 'button-hover-press.gif', crop=f'520:180:{region[0]}:{region[1]}', width=780, start=start)


def clip_textlink(browser):
    with Clip(browser, 'text-link-underline') as c:
        p = c.page
        go(p, '/')
        link = p.get_by_role('link', name='View full product details')
        link.scroll_into_view_if_needed()
        p.evaluate('window.scrollBy(0, -200)')
        settle(p, 600)
        box = link.bounding_box()
        p.mouse.move(box['x'] - 80, box['y'] + box['height'] / 2)
        settle(p, 200)
        start = c.elapsed()
        settle(p, 300)
        p.mouse.move(box['x'] + box['width'] / 2, box['y'] + box['height'] / 2, steps=10)
        settle(p, 700)
        p.mouse.move(box['x'] - 80, box['y'] + box['height'] / 2, steps=10)
        settle(p, 600)
        region = (int(box['x']) - 30, int(box['y']) - 30)
    gif(c.path, OUT / 'text-link-underline.gif', crop=f'360:90:{region[0]}:{region[1]}', width=720, start=start)


def clip_dropdown(browser):
    with Clip(browser, 'nav-dropdown') as c:
        p = c.page
        go(p, '/')
        trig = p.get_by_role('button', name='Products')
        box = trig.bounding_box()
        p.mouse.move(box['x'] + box['width'] / 2, box['y'] + 140)
        settle(p, 400)
        p.mouse.move(box['x'] + box['width'] / 2, box['y'] + box['height'] / 2, steps=10)
        settle(p, 900)
        sol = p.get_by_role('button', name='Solutions').bounding_box()
        p.mouse.move(sol['x'] + sol['width'] / 2, sol['y'] + sol['height'] / 2, steps=10)
        settle(p, 900)
        p.mouse.move(sol['x'] + sol['width'] / 2, sol['y'] + 420, steps=14)
        settle(p, 700)
        # keyboard: open with click, close with Escape
        trig.click()
        settle(p, 700)
        p.keyboard.press('Escape')
        settle(p, 500)
    gif(c.path, OUT / 'nav-dropdown.gif', crop='900:420:190:0', fps=15, width=900)


def clip_mobile_menu(browser):
    with Clip(browser, 'mobile-menu', viewport=PHONE, is_mobile=True, has_touch=True) as c:
        p = c.page
        go(p, '/')
        settle(p, 400)
        p.get_by_role('button', name='Open menu').click()
        settle(p, 1000)
        p.get_by_role('button', name='Close menu').click()
        settle(p, 700)
    gif(c.path, OUT / 'mobile-menu.gif', fps=20, width=390)


def clip_route(browser):
    with Clip(browser, 'route-change') as c:
        p = c.page
        go(p, '/')
        p.mouse.wheel(0, 700)
        settle(p, 900)
        p.get_by_role('link', name='Pricing', exact=True).first.click()
        p.wait_for_url('**/products')
        settle(p, 1200)
        p.get_by_role('link', name='Credo', exact=True).click()
        p.wait_for_url(BASE + '/')
        settle(p, 1200)
        p.get_by_role('link', name='API Docs').first.click()
        p.wait_for_url('**/docs')
        settle(p, 1200)
    gif(c.path, OUT / 'route-change.gif', fps=15, width=880)


def clip_scroll_reveal(browser):
    with Clip(browser, 'scroll-reveal') as c:
        p = c.page
        go(p, '/')
        settle(p, 600)
        for _ in range(9):
            p.mouse.wheel(0, 160)
            settle(p, 140)
        settle(p, 1400)
        for _ in range(8):
            p.mouse.wheel(0, 150)
            settle(p, 140)
        settle(p, 1400)
    gif(c.path, OUT / 'scroll-reveal.gif', fps=15, width=880)


def clip_record(browser):
    with Clip(browser, 'verification-record') as c:
        p = c.page
        go(p, '/', wait='commit')
        settle(p, 3200)
        fig = p.get_by_label('Example verification record with specimen data').bounding_box()
        region = (int(fig['x']) - 12, int(fig['y']) - 12, int(fig['width']) + 24, int(fig['height']) + 24)
    gif(c.path, OUT / 'verification-record.gif', crop=f'{region[2]}:{region[3]}:{region[0]}:{region[1]}', width=520)


def clip_faq(browser):
    with Clip(browser, 'faq-accordion') as c:
        p = c.page
        go(p, '/products')
        head = p.get_by_role('heading', name='Frequently Asked Questions')
        head.scroll_into_view_if_needed()
        p.evaluate('window.scrollBy(0, -120)')
        settle(p, 700)
        p.get_by_role('button', name='How does the bundle pricing work?').click()
        settle(p, 900)
        p.get_by_role('button', name='Is there a free tier?').click()
        settle(p, 900)
        p.get_by_role('button', name='Is there a free tier?').click()
        settle(p, 700)
        box = head.bounding_box()
    gif(c.path, OUT / 'faq-accordion.gif', crop=f'1100:640:90:{int(box["y"]) - 20}', width=880)


def clip_copy(browser):
    with Clip(browser, 'docs-copy', permissions=['clipboard-read', 'clipboard-write']) as c:
        p = c.page
        go(p, '/docs')
        pre = p.get_by_label('Authentication example', exact=True)
        pre.scroll_into_view_if_needed()
        p.evaluate('window.scrollBy(0, -160)')
        settle(p, 600)
        btn = p.get_by_role('button', name='Copy authentication example')
        box = btn.bounding_box()
        p.mouse.move(box['x'] - 200, box['y'] + 60)
        settle(p, 300)
        p.mouse.move(box['x'] + box['width'] / 2, box['y'] + box['height'] / 2, steps=10)
        settle(p, 400)
        btn.click()
        settle(p, 1200)
        copied = p.evaluate('navigator.clipboard.readText()')
        settle(p, 900)
        pbox = pre.bounding_box()
        region = (int(pbox['x']) - 10, int(pbox['y']) - 10, int(pbox['width']) + 20, int(pbox['height']) + 20)
    gif(c.path, OUT / 'docs-copy.gif', crop=f'{region[2]}:{region[3]}:{region[0]}:{region[1]}', width=760)
    return {'clipboard': copied}


def clip_contact(browser):
    with Clip(browser, 'contact-validation') as c:
        p = c.page
        go(p, '/contact')
        name = p.get_by_label('Your Name *')
        name.scroll_into_view_if_needed()
        p.evaluate('window.scrollBy(0, -140)')
        settle(p, 500)
        name.click()
        settle(p, 500)
        p.keyboard.press('Tab')  # leave empty -> error
        settle(p, 600)
        p.keyboard.type('adyan@spot', delay=40)
        settle(p, 300)
        p.keyboard.press('Tab')  # invalid email -> error
        settle(p, 700)
        name.click()
        p.keyboard.type('Dan Tanver', delay=40)
        p.keyboard.press('Tab')
        settle(p, 600)
        p.get_by_role('button', name='Send Message').click()  # message empty -> blocked client-side
        settle(p, 1200)
        form_box = p.locator('form').bounding_box()
        region = (int(form_box['x']) - 10, int(form_box['y']) - 10, int(form_box['width']) + 20, min(int(form_box['height']) + 20, 620))
        blocked = list(c.blocked)
    gif(c.path, OUT / 'contact-validation.gif', crop=f'{region[2]}:{region[3]}:{region[0]}:{region[1]}', width=760)
    return {'contact_posts_blocked': blocked}


# ---------------------------------------------------------------- checks

CLS_PROBE = """
() => new Promise((resolve) => {
  let total = 0;
  const po = new PerformanceObserver((list) => { for (const e of list.getEntries()) if (!e.hadRecentInput) total += e.value; });
  po.observe({ type: 'layout-shift', buffered: true });
  setTimeout(() => { po.disconnect(); resolve(total); }, 300);
})
"""


def check_reduced_motion(browser):
    """Reduced motion: nothing held back, stats final immediately, durations collapsed."""
    with Clip(browser, 'reduced-motion', reduced_motion='reduce') as c:
        p = c.page
        go(p, '/')
        settle(p, 400)
        for _ in range(12):
            p.mouse.wheel(0, 300)
            settle(p, 60)
        settle(p, 300)
        res = p.evaluate("""() => ({
          pending: document.querySelectorAll('[data-reveal="pending"]').length,
          anyIn: document.querySelectorAll('[data-reveal="in"]').length,
          statsText: [...document.querySelectorAll('dd')].slice(0, 4).map((d) => d.textContent.trim()),
          actionTransition: getComputedStyle(document.querySelector('a.group')).transitionDuration,
          menuTransition: getComputedStyle(document.querySelector('.menu-panel')).transitionDuration,
          recordValueAnim: getComputedStyle(document.querySelector('.resolve-value')).animationDuration,
          hidden: [...document.querySelectorAll('.resolve-value, .reveal, .reveal-cells > *')].filter((el) => getComputedStyle(el).opacity !== '1').length,
        })""")
        p.screenshot(path=str(OUT / 'reduced-motion-scrolled.png'))
    return {'reduced_motion': res}


def check_cls(browser):
    out = {}
    for path in ['/', '/products', '/docs']:
        ctx = browser.new_context(viewport=DESKTOP)
        p = ctx.new_page()
        p.goto(f'{BASE}{path}', wait_until='networkidle')
        p.wait_for_timeout(2500)
        for _ in range(12):
            p.mouse.wheel(0, 400)
            p.wait_for_timeout(120)
        p.wait_for_timeout(800)
        out[path] = p.evaluate(CLS_PROBE)
        ctx.close()
    return {'cls': out}


def check_motion_states(browser):
    """Default state is visible before any script marks it; after scroll everything resolves to 'in'."""
    ctx = browser.new_context(viewport=DESKTOP, java_script_enabled=False)
    p = ctx.new_page()
    p.goto(f'{BASE}/', wait_until='load')
    nojs = p.evaluate("""() => ({
      pending: document.querySelectorAll('[data-reveal]').length,
      hidden: [...document.querySelectorAll('.reveal, .reveal-cells > *, dd')].filter((el) => getComputedStyle(el).opacity !== '1').length,
      stats: [...document.querySelectorAll('dd')].slice(0, 4).map((d) => d.textContent.trim()),
    })""")
    ctx.close()
    ctx = browser.new_context(viewport=DESKTOP)
    p = ctx.new_page()
    p.goto(f'{BASE}/', wait_until='networkidle')
    p.wait_for_timeout(500)
    before = p.evaluate("document.querySelectorAll('[data-reveal=\"pending\"]').length")
    for _ in range(40):
        p.mouse.wheel(0, 300)
        p.wait_for_timeout(80)
    p.wait_for_timeout(1200)
    after = p.evaluate("""() => ({
      pending: document.querySelectorAll('[data-reveal="pending"]').length,
      in: document.querySelectorAll('[data-reveal="in"]').length,
      stillHidden: [...document.querySelectorAll('.reveal, .reveal-cells > *')].filter((el) => getComputedStyle(el).opacity !== '1').length,
    })""")
    # Route transition: never on the server-rendered load, always on a client navigation.
    first_load = p.evaluate("!!document.querySelector('[data-route-enter]')")
    p.get_by_role('link', name='Pricing', exact=True).first.click()
    p.wait_for_url('**/products')
    p.wait_for_timeout(100)
    navigated = p.evaluate("""() => {
      const el = document.querySelector('[data-route-enter]');
      const main = el && el.querySelector(':scope > :not(header)');
      const header = el && el.querySelector(':scope > header');
      return {
        marked: !!el,
        contentAnimation: main ? getComputedStyle(main).animationName : null,
        headerAnimation: header ? getComputedStyle(header).animationName : null,
        scrollY: window.scrollY,
      };
    }""")
    ctx.close()
    return {'no_js': nojs, 'pending_after_load': before, 'after_scroll': after, 'route_enter': {'on_first_load': first_load, 'after_navigation': navigated}}


CLIPS = {
    'button': clip_button,
    'textlink': clip_textlink,
    'dropdown': clip_dropdown,
    'mobile': clip_mobile_menu,
    'route': clip_route,
    'scroll': clip_scroll_reveal,
    'record': clip_record,
    'faq': clip_faq,
    'copy': clip_copy,
    'contact': clip_contact,
}
CHECKS = {
    'reduced': check_reduced_motion,
    'cls': check_cls,
    'states': check_motion_states,
}


def main(argv):
    wanted = argv[1:] or [*CLIPS, *CHECKS]
    (OUT / '_raw').mkdir(exist_ok=True)
    results = {}
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        for key in wanted:
            fn = CLIPS.get(key) or CHECKS.get(key)
            if not fn:
                print(f'unknown clip {key}', file=sys.stderr)
                continue
            print(f'-> {key}', flush=True)
            r = fn(browser)
            if r:
                results.update(r)
        browser.close()
    shutil.rmtree(OUT / '_raw', ignore_errors=True)
    if results:
        existing = {}
        if (OUT / 'checks.json').exists():
            existing = json.loads((OUT / 'checks.json').read_text())
        existing.update(results)
        (OUT / 'checks.json').write_text(json.dumps(existing, indent=2))
        print(json.dumps(results, indent=2))


if __name__ == '__main__':
    main(sys.argv)

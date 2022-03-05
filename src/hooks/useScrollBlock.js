import { useRef } from "react"
let scrollPosition = 0;
const useScrollBlock = () => {
  const $body = document.querySelector('body');

  const scroll = useRef(false)

  const blockScroll = () => {
    if (typeof document === "undefined") return

    const html = document.documentElement
    const { body } = document

    if (!body || !body.style || scroll.current) return

    const scrollBarWidth = window.innerWidth - html.clientWidth
    const bodyPaddingRight = parseInt(window.getComputedStyle(body).getPropertyValue("padding-right")) || 0

    /**
     * 1. Fixes a bug in iOS and desktop Safari whereby setting
     *    `overflow: hidden` on the html/body does not prevent scrolling.
     * 2. Fixes a bug in desktop Safari where `overflowY` does not prevent
     *    scroll if an `overflow-x` style is also applied to the body.
     */
     scrollPosition = window.pageYOffset;
     $body.style.overflow = 'hidden';
     $body.style.top = `-${scrollPosition}px`;
     $body.style.width = '100%';
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`

    scroll.current = true
  }

  const allowScroll = () => {
    if (typeof document === "undefined") return

    const html = document.documentElement
    const { body } = document

    if (!body || !body.style || !scroll.current) return

    html.style.position = ""
    html.style.overflow = ""

    $body.style.removeProperty('overflow');
    $body.style.removeProperty('position');
    $body.style.removeProperty('top');
    $body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition);
    body.style.paddingRight = ""

    scroll.current = false
  }

  return [blockScroll, allowScroll]
}

export { useScrollBlock }
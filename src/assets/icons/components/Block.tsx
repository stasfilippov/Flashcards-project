import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgBlock = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    ref={ref}
    viewBox={'0 0 24 24'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#block_svg__a)'}>
      <path
        d={'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16'}
        fill={'currentcolor'}
      />
      <path d={'m7.043 19.362 10-15'} stroke={'currentcolor'} strokeWidth={2.3} />
    </g>
    <defs>
      <clipPath id={'block_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'currentcolor'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgBlock)
const Memo = memo(ForwardRef)

export default Memo

import {
  ChevronDoubleRightIcon,
//   ChevronDoubleLeftIcon,
//   ArrowUturnRightIcon
} from '@heroicons/react/24/solid'

export const Landing = () => {
  return (
    <div className="page_container flex flex-col 
    justify-between items-center gap-[24px]">
      <div className="border h-full w-full max-w-[700px] mx-auto">
        text conversation
      </div>
      <div className="h-[100px] w-full max-w-[700px] mx-auto">
          <div className='flex items-center gap-[8px]'>
            <ChevronDoubleRightIcon className='w-[14px] h-[14px]'/>
            <p>Tell me about the software solution you are looking for*</p>
          </div>
          <div>
            input
          </div>
          <div>
            keywords
          </div>
      </div>
    </div>
  )
}
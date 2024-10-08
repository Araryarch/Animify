interface topbarProps {
  title: string
  pages: string | number
}

const Topbar = ({ title, pages }: topbarProps) => {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 flex items-center justify-center p-16 text-white">
        <div className="flex-1 border-[1px]"></div>
        <div className="flex-1 border-[1px]"></div>
        <div className="flex-1"></div>
        <div className="flex flex-col items-center justify-center flex-initial text-5xl">
          <h1 className="logo">{title}</h1>
          <p className="text-xs logo">section</p>
        </div>
        <div className="flex-1 hidden xl:flex"></div>
        <div className="flex-1 hidden xl:flex">PAGE - {pages} / 02</div>
        <div className="flex-1 border-[1px] hidden xl:flex"></div>
      </div>
      <div className="h-44"></div>
    </>
  )
}

export default Topbar

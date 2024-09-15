const Navbar = () => {
  return (
    <div className="fixed top-0 flex items-center justify-center w-full gap-5 p-10 text-md xl:text-xl font-medium text-[#fffffe] uppercase containers">
      <a className="hover:text-slate-400" href="#">
        Home
      </a>
      <a className="hover:text-slate-400" href="#">
        Anime
      </a>
      <a className="hover:text-slate-400" href="#">
        Membership
      </a>
      <a className="hover:text-slate-400" href="#">
        Contact
      </a>
    </div>
  )
}

export default Navbar

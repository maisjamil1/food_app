
function Menu({ fill = "text-gray-700", width = "100", height = "100", className = "" }) {
    return (
      <svg className={`${className} ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill={fill}>
        <g fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}>
          <g transform="scale(5.12,5.12)">
            <path d="M0,9v2h50v-2zM0,24v2h50v-2zM0,39v2h50v-2z"></path>
          </g>
        </g>
      </svg>
    )
  }
  
  export default Menu
  
// import { motion } from "framer-motion";
// import { useState } from "react";
// import { personal } from "../data/portfolio";

// export default function Footer() {
//   const year = new Date().getFullYear();
//   const [hovered, setHovered] = useState(false);

//   return (
//     <footer
//       role="contentinfo"
//       className="py-14 relative overflow-hidden"
//       style={{
//         borderTop: "1px solid var(--border)",
//         background: "var(--canvas)",
//       }}
//     >
//       <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-5">

//         {/* MAIN IDENTITY */}
//         <motion.div
//           onHoverStart={() => setHovered(true)}
//           onHoverEnd={() => setHovered(false)}
//           className="relative cursor-default"
//         >
//           <motion.p
//             className="text-sm tracking-wide"
//             style={{ color: "var(--muted)" }}
//             animate={{ opacity: hovered ? 0.2 : 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             © {year} {personal.name}
//           </motion.p>

//           {/* SIGNATURE REVEAL */}
//           <motion.div
//             initial={false}
//             animate={{
//               opacity: hovered ? 1 : 0,
//               y: hovered ? 0 : 8,
//               scale: hovered ? 1 : 0.98,
//             }}
//             transition={{ duration: 0.35, ease: "easeOut" }}
//             className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
//           >
//             <p
//               style={{
//                 fontFamily: "cursive",
//                 fontSize: "18px",
//                 color: "var(--ink)",
//                 letterSpacing: "1px",
//               }}
//             >
//               {personal.name}
//             </p>
//           </motion.div>
//         </motion.div>

//         {/* TAGLINE */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.15 }}
//           className="text-xs italic"
//           style={{ color: "var(--muted)" }}
//         >
//           Minimal thinking. Maximum intent.
//         </motion.p>

//         {/* SUBTLE LINE */}
//         <motion.div
//           initial={{ scaleX: 0 }}
//           animate={{ scaleX: 1 }}
//           transition={{ delay: 0.25 }}
//           style={{
//             width: "70px",
//             height: "1px",
//             background: "var(--border)",
//             transformOrigin: "center",
//             opacity: 0.6,
//           }}
//         />
//       </div>
//     </footer>
//   );
// }

import { motion } from "framer-motion";
import { useState } from "react";
import { personal } from "../data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();
  const [hovered, setHovered] = useState(false);

  return (
    <footer
      className="py-16 relative"
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--canvas)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-6 text-center">

        {/* CORE SIGNATURE AREA */}
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className="relative cursor-default w-full flex justify-center"
        >

          {/* BASE FOOTER TEXT (blurs away) */}
          <motion.p
            animate={{
              opacity: hovered ? 0 : 1,
              filter: hovered ? "blur(10px)" : "blur(0px)",
              scale: hovered ? 0.98 : 1,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-sm whitespace-nowrap"
            style={{ color: "var(--muted)" }}
          >
            © {year} {personal.name}
          </motion.p>

          {/* SIGNATURE (ONLY THING THAT MATTERS ON HOVER) */}
          <motion.p
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              filter: hovered ? "blur(0px)" : "blur(8px)",
              scale: hovered ? 1 : 0.98,
              letterSpacing: hovered ? "3px" : "1px",
            }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute"
            style={{
              fontSize: "22px",
              fontWeight: 400,
              color: "var(--ink)",
              fontFamily: "ui-serif, Georgia",
            }}
          >
            {personal.name}
          </motion.p>
        </motion.div>

        {/* TAGLINE (also disappears cleanly on hover) */}
        <motion.p
          animate={{
            opacity: hovered ? 0 : 1,
            filter: hovered ? "blur(8px)" : "blur(0px)",
          }}
          transition={{ duration: 0.3 }}
          className="text-xs tracking-wide"
          style={{ color: "var(--muted)" }}
        >
          Minimal thinking. Maximum intent.
        </motion.p>
               {/* SUBTLE LINE */}
      <motion.div
               initial={{ scaleX: 0 }}
           animate={{ scaleX: 1 }}
           transition={{ delay: 0.25 }}
           style={{
             width: "70px",
             height: "1px",
             background: "var(--border)",
             transformOrigin: "center",
             opacity: 0.6,
           }}
        />

      </div>
    </footer>
  );
}
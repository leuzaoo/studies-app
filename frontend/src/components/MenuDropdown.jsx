import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import * as Ariakit from "@ariakit/react";
import * as React from "react";
import clsx from "clsx";

export const MenuDropdown = React.forwardRef(function Menu(
  {
    open,
    setOpen,
    label,
    children,
    animate,
    transition,
    variants,
    initial,
    exit,
    ...props
  },
  ref
) {
  const menu = Ariakit.useMenuStore({ open, setOpen });
  const currentPlacement = Ariakit.useStoreState(menu, "currentPlacement");
  const mounted = Ariakit.useStoreState(menu, "mounted");
  return (
    <MotionConfig reducedMotion="user">
      <Ariakit.MenuButton
        store={menu}
        ref={ref}
        {...props}
        className={clsx("button", props.className)}
      >
        {label}
        <Ariakit.MenuButtonArrow />
      </Ariakit.MenuButton>
      <AnimatePresence>
        {mounted && (
          <Ariakit.Menu
            store={menu}
            alwaysVisible
            className="menu z-20"
            data-placement={currentPlacement}
            render={
              <motion.div
                initial={initial}
                exit={exit}
                animate={animate}
                variants={variants}
                transition={transition}
              />
            }
          >
            <Ariakit.MenuArrow className="menu-arrow" />
            {children}
          </Ariakit.Menu>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
});

// Instead of using the Ariakit `render` prop, we give control to Framer Motion
// so it can process the props before we pass the remainder to
// `Ariakit.MenuItem`.
// @ts-expect-error https://github.com/framer/motion/issues/2792
const MotionMenuItem = motion.create(Ariakit.MenuItem);

export const MenuItem = React.forwardRef(function MenuItem(props, ref) {
  return (
    <MotionMenuItem
      ref={ref}
      {...props}
      className={clsx("menu-item", props.className)}
    />
  );
});

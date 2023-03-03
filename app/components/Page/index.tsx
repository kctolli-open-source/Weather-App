import type { ReactNode } from "react";
import { Nav } from "../Nav";
import styles from "./styles.module.css";

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <Nav />
      <div className={styles.container}>{children}</div>
    </div>
  );
}

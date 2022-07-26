import Books from "../components/Books";
import Landing from "../components/Landing";
import s from "../styles/landing.module.scss";

export default function Home() {
  return (<div className={s.body}>
  <Landing />
  <Books />
  </div>
  )
}

import { Link } from "../Link.jsx";

const i18n = {
  es: {
    title: "Sobre nosotros",
    button: "Ir a Home",
    description: "Este es un clon de React Router",
  },
  en: {
    title: "About us",
    button: "Go to Home",
    description: "This is a clone of React Router",
  },
};

const useI18n = (lang) => {
  return i18n[lang];
};
export default function AboutPage({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? "es");
  return (
    <>
      <h1>{i18n.title}</h1>
      <p>{i18n.description}</p>
      <Link to="/">{i18n.button}</Link>
    </>
  );
}

// JSON-LD structured data'yı <script type="application/ld+json"> olarak basar
export default function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

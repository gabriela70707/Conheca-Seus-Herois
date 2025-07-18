import React from "react";

const mapaLivros = {
  "Gênesis": "gn",
  "Êxodo": "ex",
  "Levítico": "lv",
  "Números": "nm",
  "Deuteronômio": "dt",
  "Josué": "js",
  "Juízes": "jz",
  "Rute": "rt",
  "1 Samuel": "1sm",
  "2 Samuel": "2sm",
  "1 Reis": "1rs",
  "2 Reis": "2rs",
  "1 Crônicas": "1cr",
  "2 Crônicas": "2cr",
  "Esdras": "ed",
  "Neemias": "ne",
  "Ester": "et",
  "Jó": "jo",
  "Salmos": "sl",
  "Provérbios": "pv",
  "Eclesiastes": "ec",
  "Cantares": "ct",
  "Isaías": "is",
  "Jeremias": "jr",
  "Lamentações": "lm",
  "Ezequiel": "ez",
  "Daniel": "dn",
  "Oseias": "os",
  "Joel": "jl",
  "Amós": "am",
  "Obadias": "ob",
  "Jonas": "jn",
  "Miquéias": "mq",
  "Naum": "na",
  "Habacuque": "hc",
  "Sofonias": "sf",
  "Ageu": "ag",
  "Zacarias": "zc",
  "Malaquias": "ml",
  "Mateus": "mt",
  "Marcos": "mc",
  "Lucas": "lc",
  "João": "jo",
  "Atos": "at",
  "Romanos": "rm",
  "1 Coríntios": "1co",
  "2 Coríntios": "2co",
  "Gálatas": "gl",
  "Efésios": "ef",
  "Filipenses": "fp",
  "Colossenses": "cl",
  "1 Tessalonicenses": "1ts",
  "2 Tessalonicenses": "2ts",
  "1 Timóteo": "1tm",
  "2 Timóteo": "2tm",
  "Tito": "tt",
  "Filemom": "fm",
  "Hebreus": "hb",
  "Tiago": "tg",
  "1 Pedro": "1pe",
  "2 Pedro": "2pe",
  "1 João": "1jo",
  "2 João": "2jo",
  "3 João": "3jo",
  "Judas": "jd",
  "Apocalipse": "ap"
};

const LivroBibliaLink = ({ livro }) => {
  const slug = mapaLivros[livro];
  if (!slug) return <span>{livro}</span>;

  const url = `https://www.bibliaonline.com.br/ntlh/${slug}`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {livro}
    </a>
  );
};

export default LivroBibliaLink;

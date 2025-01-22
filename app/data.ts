////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type ContactMutation = {
  id?: string;
  name?: string;
  scientific_name?: string;
  avatar?: string;
  description?: string;
  notes?: string;
  favorite?: boolean;
};

export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeContacts = {
  records: {} as Record<string, ContactRecord>,

  async getAll(): Promise<ContactRecord[]> {
    return Object.keys(fakeContacts.records)
      .map((key) => fakeContacts.records[key])
      .sort(sortBy("-createdAt", "scientific_name"));
  },

  async get(id: string): Promise<ContactRecord | null> {
    return fakeContacts.records[id] || null;
  },

  async create(values: ContactMutation): Promise<ContactRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    fakeContacts.records[id] = newContact;
    return newContact;
  },

  async set(id: string, values: ContactMutation): Promise<ContactRecord> {
    const contact = await fakeContacts.get(id);
    invariant(contact, `No contact found for ${id}`);
    const updatedContact = { ...contact, ...values };
    fakeContacts.records[id] = updatedContact;
    return updatedContact;
  },

  destroy(id: string): null {
    delete fakeContacts.records[id];
    return null;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["name", "scientific_name"],
    });
  }
  return contacts.sort(sortBy("name", "createdAt"));
}

export async function createEmptyContact() {
  const contact = await fakeContacts.create({});
  return contact;
}

export async function getContact(id: string) {
  return fakeContacts.get(id);
}

export async function updateContact(id: string, updates: ContactMutation) {
  const contact = await fakeContacts.get(id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }
  await fakeContacts.set(id, { ...contact, ...updates });
  return contact;
}

export async function deleteContact(id: string) {
  fakeContacts.destroy(id);
}

[
  {
    avatar:
      "https://cdn0.expertoanimal.com/es/posts/0/4/7/loro_orejiamarillo_ognorhynchus_icterotis_26740_0_600.webp",
    name: "Oropéndola",
    adjective: "Chocoana",
    scientific_name: "Psarocolius cassini",
    description: "También se le conoce como la oropéndola Baudó (Psarocolius cassini), es una hermosa y llamativa ave endémica de Colombia. Habita específicamente en el Choco, al noreste de la región, viviendo en estribaciones y tierras bajas. Su población está en descenso a causa de la destrucción de los bosques, por lo que se ha clasificado como Vulnerable. Mide entre 40 a 46 cm, siendo los machos más grandes. Es principalmente de color negro, pero el plumaje superior es castaño, con zonas desnudas en la cara de color rojizo al igual que sobre las alas, y la cola amarilla.",
  },
  {
    avatar:
      "https://cdn0.expertoanimal.com/es/posts/0/4/7/oropendola_chocoana_psarocolius_cassini_26740_1_600.webp",
    name: "Carpinterito",
    adjective: "Colombiano",
    scientific_name: "Picumnus granadensis",
    description: "El carpintero o carpinterito colombiano (Picumnus granadensis), es un tipo de carpintero y también un ave nativa de Colombia, de hecho, es endémica. Se clasifica como de Menor preocupación, aunque su población está en descenso. El plumaje superior es marrón grisáceo, mientras que abajo es más claro. Además estas aves de Colombia poseen una corona más oscura con manchas blancas que les dan un aspecto muy curioso. Se desarrolla en diversos bosques en el oeste de Colombia.",
  },
  {
    avatar:
      "https://cdn0.expertoanimal.com/es/posts/0/4/7/carpinterito_colombiano_picumnus_granadensis_26740_2_600.webp",
    name: "Cucarachero",
    adjective: "Samario",
    scientific_name: "Troglodytes monticola",
    description: "El cucarachero o reyezuelo de Santa Marta (Troglodytes monticola) es otra de las especies de aves endémica de Colombia, específicamente de la Sierra Nevada de Santa Marta, donde habita en los limites de bosques en arbustos pequeños y que corresponden con el ecotono a grandes alturas. Lamentablemente, debido a la severa deforestación que solo deja menos del 15% del bosque original, esta ave de Colombia está clasificada En peligro Crítico de extinción. Su tamaño es de unos 11,5 cm, el color superior es marrón rojizo, con franjas negruzcas en la parte inferior de la espalda, mientras que las plumas de la cola son de color marrón"
  },
  {
    avatar:
      "https://cdn0.expertoanimal.com/es/posts/0/4/7/cucarachero_de_santa_marta_troglodytes_monticola_26740_3_600.webp",
    name: "Pavón",
    adjective: "Pico Azul",
    scientific_name: "Crax alberti",
    description: "El pavón piquiazul (Crax alberti), es un ave nativa y endémica de Colombia. Es un ave hermosa y enorme, de casi un metro de largo y una masa entre 3,2 a 3,6 kg. Los machos son de color negro con las puntas de las plumas en el vientre blanco, una cresta despeinada y bultos azules en la mandíbula inferior del pico, mientras que las hembras poseen el vientre castaño, con blanco tanto en su manto como en la cresta, y en el caso de la base del pico el azul es más suave. Estas aves de Colombia viven en bosques húmedos a unos 1.200 metros de altura, pero están clasificadas En peligro crítico de extinción por la severa degradación del hábitat.",
  },
  {
    avatar:
      "https://cdn0.expertoanimal.com/es/posts/3/1/0/_25013_3_600.webp",
    name: "Macá",
    adjective: "Tobiano",
    scientific_name: "Podiceps gallardoi",
    description: "Esta especie pertenecen al orden Podicipediformes y es endémica de la región patagónica de Argentina y Chile. Se trata de un ave con el cuerpo bastante compacto y de unos 28 cm de largo, siendo una especie de zampullín bastante pequeña. Además posee requerimientos muy específicos a la hora de nidificar, ya que solo lo hace en lagunas de mesetas de aguas cristalinas y transparentes y con presencia de plantas acuáticas en la región de la Patagonia, y es un rasgo que lo vuelve muy sensible a los cambios de su hábitat. Por ello, el macá tobiano actualmente se categoriza en peligro crítico de extinción."
  },
  {
    avatar:
      "https://cdn0.expertoanimal.com/es/posts/0/4/7/pavon_de_pico_azul_crax_alberti_26740_4_600.webp",
    name: "Montañerito",
    adjective: "Paisa",
    scientific_name: "Atlapetes blancae",
    description: "También conocido como pinzón de Antioquia (Atlapetes blancae), es una de las aves endémicas de Colombia que habita en matorrales con árboles bajos o jardines rurales. También es otra ave de Colombia en Peligro de Extinción por la conversión del hábitat como tierras agrícolas. Es una especie de ave colombiana poco conocida, reportada a partir de pocos ejemplares tenidos en museos en los años 70, y que recientemente ha sido identificada en los andes de Colombia. Aun así, hay que esperar estudios más detallados. Tiene una coloración marrón grisácea en la parte superior, pálido en la inferior y la cabeza color naranja opaco.",
  },
  {
    avatar:
      "https://cdn0.expertoanimal.com/es/posts/0/4/7/montanerito_paisa_atlapetes_blancae_26740_5_600.webp",
    name: "Tangara",
    adjective: "Multicolor",
    scientific_name: "Chlorochrysa nitidissima",
    description: "Otra de las aves de Colombia es la tangara multicolor (Chlorochrysa nitidissima), endémica de los Andes occidentales y norcentrales de esta región. Se desarrolla en bosques montanos húmedos, espacios cubiertos con musgos y algunos bosques secundarios. Tiene un llamativo patrón colorido, que combina el pecho azul eléctrico, vientre negro, nuca y las alas verdes, espalda crema, garganta dorada y manchas castaño o negro en los oídos. Se le clasifica como Casi amenazado por la pérdida y fragmentación de los bosques.",
  },
  {
    avatar:
      "https://cdn0.expertoanimal.com/es/posts/0/4/7/tangara_multicolor_chlorochrysa_nitidissima_26740_6_600.webp",
    name: "Inca",
    adjective: "Antioqueña",
    scientific_name: "Coeligena orina",
    description: "A esta ave de Colombia también se le conoce como frente estelar brillante (Coeligena orina). Es un tipo de colibrí endémico, y como muchas otras aves de la región colombiana con un colorido llamativo. Mide unos 14 cm y de entre 6 a 7 gr, con el vientre y la rabadilla verde iridiscente. De estas aves colombianas, el macho posee la frente verde y alrededor del cuello zafiro, las hembras no tienen estos últimos colores pero su garganta es amarillo-naranja. Vive en bosques enanos, húmedos y páramos. Se clasifica En peligro de extinción por la deforestación, pero además el área es de interés minero lo que amenaza a la especie si se empieza esta explotación.",
  },
  {
    avatar:
      "https://cdn0.expertoanimal.com/es/posts/0/4/7/inca_de_antioquia_coeligena_orina_26740_7_600.webp",
    name: "Chachalaca",
    adjective: "Colombiana",
    scientific_name: "Ortalis columbiana",
    description: "La chachalaca o guacharaca colombiana (Ortalis columbiana) es endémica del país, pero ha sido extirpada de gran parte de su área nativa que eran los Valles del Cauca y Magdalena. Esta ave colombiana tiene una forma similar a una gallina, con un color marrón de diferentes tonos, en el pecho hay líneas blancas que forman un patrón simétrico, la garganta y las plumas externas de la cola son rojas. Habita en zonas boscosas, y aunque sus población se considera en disminución, está clasificada como de Menor preocupación.",
  },
  {
    avatar:
      "https://cdn0.expertoanimal.com/es/posts/0/4/7/chachalaca_colombiana_ortalis_columbiana_26740_8_600.webp",
    name: "Capito",
    adjective: "Dorsiblanco",
    scientific_name: "Capito hypoleucus",
    description: "A esta especie de ave colombiana también se le llama cabezón dorsiblanco (Capito hypoleucus), siendo otra de las especies endémicas de Colombia. Está restringido al norte de los Andes centrales y al oeste de los orientales, en bosques húmedos y de galería entre 350 y 2.000 metros. El plumaje de arriba es negro brillante, mientras que el de abajo es un blanco hueso, comuna franja marrón claro a nivel del pecho; y un parche rojo en la frente. A esta ave de Colombia se le clasifica como Vulnerable porque los bosques son impactos y transformados para ganadería y agricultura.",
  },
].forEach((contact) => {
  fakeContacts.create({
    ...contact,
    id: `${contact.name.toLowerCase()}-${contact.adjective.toLowerCase()}`,
  });
});

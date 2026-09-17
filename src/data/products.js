// Sample catalog. Swap the palette for a real photo whenever you're ready —
// see the "Using your own photos" section in README.md.
//
// `category` is a key into translations.js's categories dict, not display
// text, so it stays consistent everywhere it's shown. Everything else that's
// language-dependent (title, medium, size, description) is an { en, bg }
// pair — read the current one with getLocalized(product, "title", lang).

import treeCraftKitImg from "../assets/tree-craft-kit.png";
import { getSavedProducts, saveProducts } from "../utils/storage";

export const defaultProducts = [
  {
    id: "tree-craft-kit",
    category: "landscape",
    price: 15.00,
    palette: ["#E8A33D", "#7B4B2A"],
    image: treeCraftKitImg,
    title: { en: "DIY Scandinavian Moss Tree Craft Kit", bg: "Творчески комплект \"Направи си сам\" дърво от скандинавски мъх" },
    medium: { en: "Do-it-yourself", bg: "Направи си сам" },
    size: { en: "13 × 18 cm", bg: "13 × 18 см" },
    description: {
      en: "Introducing the “Tree of Life” Scandinavian Moss DIY Craft Kit – the perfect creative activity for both children and adults!",
      bg: "Представям ви творчески комплект „Дървото на живота“ от скандинавски мъх – идеалното занимание както за деца, така и за възрастни!",
    },
  },
  {
    id: "quiet-blue-hour",
    category: "abstract",
    price: 120,
    palette: ["#2B3A67", "#0D1321"],
    title: { en: "Quiet Blue Hour", bg: "Тих син час" },
    medium: { en: "Oil on canvas", bg: "Масло върху платно" },
    size: { en: "50 × 50 cm", bg: "50 × 50 см" },
    description: {
      en: "Layers of indigo and ink built up slowly over several sittings, meant to be lived with rather than decoded.",
      bg: "Пластове индиго и мастилено синьо, натрупвани бавно в продължение на няколко сеанса — картина, с която да живееш, не да я разгадаваш.",
    },
  },
  {
    id: "botanical-whisper",
    category: "botanical",
    price: 95,
    palette: ["#6E8B5C", "#F1E7C6"],
    title: { en: "Botanical Whisper", bg: "Ботанически шепот" },
    medium: { en: "Watercolor on paper", bg: "Акварел върху хартия" },
    size: { en: "30 × 40 cm", bg: "30 × 40 см" },
    description: {
      en: "A single stem studied closely, painted wet-on-wet so the greens bleed gently into the page.",
      bg: "Едно стъбло, изследвано отблизо, изписано по мокра основа, така че зелените тонове меко се преливат в хартията.",
    },
  },
  {
    id: "terracotta-dreams",
    category: "abstract",
    price: 135,
    palette: ["#B5562F", "#2A1E1A"],
    title: { en: "Terracotta Dreams", bg: "Теракотени мечти" },
    medium: { en: "Acrylic on canvas", bg: "Акрил върху платно" },
    size: { en: "45 × 60 cm", bg: "45 × 60 см" },
    description: {
      en: "Bold, unblended color fields inspired by sun-baked clay walls and midday shadow.",
      bg: "Смели, несмесени цветни полета, вдъхновени от напечени от слънцето глинени стени и обедна сянка.",
    },
  },
  {
    id: "coastal-morning",
    category: "landscape",
    price: 160,
    palette: ["#3E7C7C", "#D8C79A"],
    title: { en: "Coastal Morning", bg: "Крайбрежна утрин" },
    medium: { en: "Oil on canvas", bg: "Масло върху платно" },
    size: { en: "50 × 70 cm", bg: "50 × 70 см" },
    description: {
      en: "Painted from a sketch made at low tide — soft fog, wet sand, and the first boat of the day.",
      bg: "Картина по скица, направена при отлив — лека мъгла, мокър пясък и първата лодка за деня.",
    },
  },
  {
    id: "portrait-in-sepia",
    category: "portrait",
    price: 180,
    palette: ["#6B4226", "#241611"],
    title: { en: "Portrait in Sepia", bg: "Портрет в сепия" },
    medium: { en: "Charcoal and ink on paper", bg: "Въглен и туш върху хартия" },
    size: { en: "40 × 50 cm", bg: "40 × 50 см" },
    description: {
      en: "A quiet, unposed likeness built from many thin layers of charcoal rather than hard outlines.",
      bg: "Тих, непозиран образ, изграден от множество тънки пластове въглен, а не от твърди контури.",
    },
  },
  {
    id: "wildflower-field",
    category: "botanical",
    price: 110,
    palette: ["#C97B9E", "#EDE1F0"],
    title: { en: "Wildflower Field", bg: "Поле с диви цветя" },
    medium: { en: "Watercolor on paper", bg: "Акварел върху хартия" },
    size: { en: "35 × 45 cm", bg: "35 × 45 см" },
    description: {
      en: "Loose, overlapping blooms in pink and lavender, left a little unfinished at the edges on purpose.",
      bg: "Свободни, застъпващи се цветове в розово и лавандулово, нарочно оставени леко недовършени по краищата.",
    },
  },
  {
    id: "midnight-bloom",
    category: "abstract",
    price: 150,
    palette: ["#4B2E5A", "#120E1B"],
    title: { en: "Midnight Bloom", bg: "Полунощен цвят" },
    medium: { en: "Acrylic on canvas", bg: "Акрил върху платно" },
    size: { en: "50 × 50 cm", bg: "50 × 50 см" },
    description: {
      en: "Deep violets and near-black, with a single pale bloom catching whatever light is left.",
      bg: "Дълбоки виолетови тонове, преливащи в почти черно, с едно бледо цветче, което улавя останалата светлина.",
    },
  },
  {
    id: "sunlit-grove",
    category: "landscape",
    price: 140,
    palette: ["#7A9B4E", "#C9A24B"],
    title: { en: "Sunlit Grove", bg: "Огряна горичка" },
    medium: { en: "Oil on canvas", bg: "Масло върху платно" },
    size: { en: "45 × 60 cm", bg: "45 × 60 см" },
    description: {
      en: "Dappled light through olive trees, painted outdoors over three afternoons in changing weather.",
      bg: "Пъстра светлина между маслинови дървета, рисувана на открито в продължение на три следобеда в променливо време.",
    },
  },
];

function mergeProductImages(savedProducts) {
  if (!savedProducts) return null;

  return savedProducts.map((savedProduct) => {
    const defaultProduct = defaultProducts.find((product) => product.id === savedProduct.id);

    return {
      ...savedProduct,
      image: savedProduct.image || defaultProduct?.image,
    };
  });
}

export function getProducts() {
  return mergeProductImages(getSavedProducts()) || defaultProducts;
}

export function updateProduct(updatedProduct) {
  const nextProducts = getProducts().map((product) =>
      product.id === updatedProduct.id
          ? {
            ...product,
            ...updatedProduct,
            price: Number(updatedProduct.price),
            palette: updatedProduct.palette,
          }
          : product
  );

  saveProducts(nextProducts);
  return nextProducts;
}

export function getProductById(id) {
  return getProducts().find((p) => p.id === id);
}

// Reads a bilingual field ({ en, bg }) in the current language, falling
// back to English if a translation is ever missing.
export function getLocalized(product, field, lang) {
  const value = product[field];
  if (value && typeof value === "object") {
    return value[lang] ?? value.en;
  }
  return value;
}

import {
  MattressCategoryName,
  MattressSizeOption,
  ProductImage,
  ProductItem,
} from '../types/product';
import diwanPrimary from '../images/diwan.png';
import diwanDetail from '../images/diwan 2.png';
import diwanRoom from '../images/diwan 3.png';
import dualComfortPrimary from '../images/dual comfort.png';
import dualComfortDetail from '../images/dual comfor 2.png';
import fullLatexPrimary from '../images/full latex.png';
import gridHybridPrimary from '../images/grd hybrid.png';
import gridPrimary from '../images/grid.png';
import gridConstruction from '../images/grid 2.png';
import gridSurface from '../images/grid 3.png';
import hrPrimary from '../images/hr.png';
import hrConstruction from '../images/hr 2.png';
import hrFoamDetail from '../images/hr 3.png';
import latexHybridPrimary from '../images/latex-hybrid.png';
import latexHybridDetail from '../images/latex hybrid 2.png';
import latexPrimary from '../images/latex.png';
import memoryFoamPrimary from '../images/memory foam 2.png';
import memoryFoamDetail from '../images/memory foam.png';
import orthopedicFoamPrimary from '../images/Orthopedic Foam Mattress.png';
import orthopedicFoamProfile from '../images/Orthopedic Foam Mattress 2.png';
import orthopedicFoamConstruction from '../images/Orthopedic Foam Mattress 3.png';
import orthopedicMemoryFoamPrimary from '../images/Orthopedic Memory Foam.png';
import orthopedicMemoryFoamProfile from '../images/Orthopedic Memory Foam 2.png';
import orthopedicMemoryFoamConstruction from '../images/Orthopedic Memory Foam 3.png';
import pocketSpringPrimary from '../images/Pocket Spring + Foam Comfort.jpeg';
import pocketSpringDetail from '../images/Pocket Spring + Foam Comfort Top.png';
import pocketSpringConstruction from '../images/Pocket Spring + Foam Comfort.png';
import rebondedPrimary from '../images/rebonded.png';
import rebondedConstruction from '../images/rebonded 2.png';
import rebondedCore from '../images/rebonded 3.png';
import trifoldPrimary from '../images/tri-fold.png';
import trifoldDetail from '../images/tri fold 2.png';
import trifoldCover from '../images/trifold 3.png';

/**
 * Editable default mattress dimensions.
 * Individual mattresses can override these with product-specific sizes and dimensions
 * (e.g., Diwan, Foldable, or Baby mattresses).
 */
export const DEFAULT_MATTRESS_DIMENSIONS = {
  Single: '72 × 36 inches',
  Double: '72 × 48 inches',
  Queen: '78 × 60 inches',
  King: '78 × 72 inches',
} as const;

/**
 * Supported mattress catalogue categories.
 * The UI automatically hides any category that currently has zero products.
 */
export const MATTRESS_CATEGORIES: readonly MattressCategoryName[] = [
  'Orthopedic Mattresses',
  'Foam Mattresses',
  'Memory Foam Mattresses',
  'Latex Mattresses',
  'Spring & Hybrid Mattresses',
  'Grid Mattresses',
  'Dual Comfort Mattresses',
  'Rebonded Mattresses',
  'HR Foam Mattresses',
  'Foldable & Diwan Mattresses',
  'Baby Mattresses',
];

/**
 * Helper to create standard size options with independent pricing slots.
 * All prices default to `null` ("Price on enquiry").
 *
 * When real prices are ready, populate either:
 * - `price`: flat price for that size, OR
 * - `priceByThickness`: { 5: 8500, 6: 9800, 8: 12000 } for thickness-dependent pricing.
 */
function createStandardSizeOptions(
  thicknesses?: number[]
): MattressSizeOption[] {
  const buildEmptyThicknessMap = () => {
    if (!thicknesses || thicknesses.length === 0) return undefined;
    const map: Partial<Record<number, number | null>> = {};
    for (const t of thicknesses) {
      map[t] = null;
    }
    return map;
  };

  return [
    {
      size: 'Single',
      dimensions: DEFAULT_MATTRESS_DIMENSIONS.Single,
      price: null,
      priceByThickness: buildEmptyThicknessMap(),
    },
    {
      size: 'Double',
      dimensions: DEFAULT_MATTRESS_DIMENSIONS.Double,
      price: null,
      priceByThickness: buildEmptyThicknessMap(),
    },
    {
      size: 'Queen',
      dimensions: DEFAULT_MATTRESS_DIMENSIONS.Queen,
      price: null,
      priceByThickness: buildEmptyThicknessMap(),
    },
    {
      size: 'King',
      dimensions: DEFAULT_MATTRESS_DIMENSIONS.King,
      price: null,
      priceByThickness: buildEmptyThicknessMap(),
    },
  ];
}

/**
 * Creates gallery entries for available local images, or placeholder slots when
 * product photography is not available yet.
 */
function createMattressImageSlots(
  productName: string,
  images: { src: string; label: string }[] = []
): ProductImage[] {
  if (images.length > 0) {
    return images.map(({ src, label }) => ({
      src,
      alt: `${productName} — ${label.toLowerCase()}`,
      label,
    }));
  }

  return [
    {
      src: null,
      alt: `${productName} — primary view`,
      label: 'Primary View',
    },
    {
      src: null,
      alt: `${productName} — side profile`,
      label: 'Side Profile',
    },
    {
      src: null,
      alt: `${productName} — surface & cover detail`,
      label: 'Surface Detail',
    },
  ];
}

/**
 * Comfyscape Mattress Catalogue Dataset (Editable Catalogue Structure).
 *
 * Important notes for editing with confirmed Comfyscape inventory:
 * - Every entry uses simple, descriptive naming based on mattress construction.
 * - All variant prices are intentionally left `null` ("Price on enquiry").
 * - `warranty` is left `null` until officially verified for each product.
 * - No ratings, review counts, discounts, or bestseller badges are hardcoded.
 * - Matched photography is imported from `src/images`; unmatched products retain placeholders.
 */
export const MATTRESS_PRODUCTS: ProductItem[] = [
  {
    id: 'orthopedic-foam-mattress',
    slug: 'orthopedic-foam-mattress',
    name: 'Orthopedic Foam Mattress',
    category: 'bed',
    mattressCategories: ['Orthopedic Mattresses', 'Foam Mattresses'],
    shortDescription:
      'Firm, structured high-density foam mattress designed for consistent spinal support.',
    description:
      'Built around a high-density supportive foam core to maintain even body weight distribution and steady back alignment. Editable product entry ready for confirmed Comfyscape foam specifications and pricing.',
    images: createMattressImageSlots('Orthopedic Foam Mattress', [
      { src: orthopedicFoamPrimary, label: 'Primary View' },
      { src: orthopedicFoamProfile, label: 'Side Profile' },
      { src: orthopedicFoamConstruction, label: 'Construction Detail' },
    ]),
    materialType: 'Foam',
    material: 'High-Density Orthopedic Support Foam',
    layers: [
      {
        name: 'Quilted Comfort Top',
        description: 'Soft quilted outer layer for surface cushioning.',
      },
      {
        name: 'High-Density Support Core',
        description: 'Firm base layer engineered to resist sagging and support the back.',
      },
    ],
    firmness: 'Firm',
    thicknessOptions: [5, 6, 8],
    sizeOptions: createStandardSizeOptions([5, 6, 8]),
    features: [
      'Firm orthopedic back support',
      'High-density foam core construction',
      'Breathable quilted fabric outer cover',
    ],
    coverInfo: 'Breathable knitted quilted cover (editable placeholder)',
    warranty: null,
    additionalSpecs: [
      { label: 'Sleep Orientation', value: 'Back & Stomach Sleepers' },
      { label: 'Custom Sizing', value: 'Available on enquiry' },
    ],
    isPlaceholderEntry: true,
  },
  {
    id: 'orthopedic-memory-foam-mattress',
    slug: 'orthopedic-memory-foam-mattress',
    name: 'Orthopedic Memory Foam Mattress',
    category: 'bed',
    mattressCategories: ['Orthopedic Mattresses', 'Memory Foam Mattresses'],
    shortDescription:
      'Contouring memory foam top paired with a supportive orthopedic foam base.',
    description:
      'Combines a pressure-relieving memory foam comfort layer with a firm orthopedic support base to balance body contouring and spinal alignment. Editable product entry ready for confirmed specifications.',
    images: createMattressImageSlots('Orthopedic Memory Foam Mattress', [
      { src: orthopedicMemoryFoamPrimary, label: 'Primary View' },
      { src: orthopedicMemoryFoamProfile, label: 'Side Profile' },
      { src: orthopedicMemoryFoamConstruction, label: 'Construction Detail' },
    ]),
    materialType: 'Memory Foam',
    material: 'Visco-Elastic Memory Foam + Orthopedic Support Foam',
    layers: [
      {
        name: 'Memory Foam Comfort Layer',
        description: 'Adapts gently to shoulders, hips, and pressure points.',
      },
      {
        name: 'Transition Foam Layer',
        description: 'Distributes weight evenly between the top and support base.',
      },
      {
        name: 'Orthopedic Support Base',
        description: 'High-density foam base providing steady spinal alignment.',
      },
    ],
    firmness: 'Medium Firm',
    thicknessOptions: [5, 6, 8, 10],
    sizeOptions: createStandardSizeOptions([5, 6, 8, 10]),
    features: [
      'Memory foam pressure relief',
      'Orthopedic high-density support base',
      'Reduced partner motion transfer',
    ],
    coverInfo: 'Removable breathable fabric cover (editable placeholder)',
    warranty: null,
    additionalSpecs: [
      { label: 'Sleep Orientation', value: 'Back & Side Sleepers' },
      { label: 'Custom Sizing', value: 'Available on enquiry' },
    ],
    isPlaceholderEntry: true,
  },
  {
    id: 'memory-foam-mattress',
    slug: 'memory-foam-mattress',
    name: 'Memory Foam Mattress',
    category: 'bed',
    mattressCategories: ['Memory Foam Mattresses'],
    shortDescription:
      'Body-contouring memory foam mattress offering plush cushioning and motion isolation.',
    description:
      'Designed with a generous visco-elastic memory foam comfort surface over a supportive foam base for gentle contouring and minimal motion transfer. Editable product entry ready for confirmed specifications.',
    images: createMattressImageSlots('Memory Foam Mattress', [
      { src: memoryFoamPrimary, label: 'Primary View' },
      { src: memoryFoamDetail, label: 'Construction Detail' },
    ]),
    materialType: 'Memory Foam',
    material: 'Visco-Elastic Memory Foam + Foam Support Base',
    layers: [
      {
        name: 'Plush Memory Foam Layer',
        description: 'Slow-response foam that molds closely to body curves.',
      },
      {
        name: 'High-Density Base Foam',
        description: 'Provides foundational stability and durability.',
      },
    ],
    firmness: 'Medium Soft',
    thicknessOptions: [6, 8, 10],
    sizeOptions: createStandardSizeOptions([6, 8, 10]),
    features: [
      'Body-contouring visco-elastic foam',
      'Low motion transfer for couples',
      'Soft knitted outer fabric cover',
    ],
    coverInfo: 'Soft knitted fabric outer cover (editable placeholder)',
    warranty: null,
    additionalSpecs: [
      { label: 'Sleep Orientation', value: 'Side & Combination Sleepers' },
      { label: 'Custom Sizing', value: 'Available on enquiry' },
    ],
    isPlaceholderEntry: true,
  },
  {
    id: 'latex-mattress',
    slug: 'latex-mattress',
    name: 'Latex Mattress',
    category: 'bed',
    mattressCategories: ['Latex Mattresses'],
    shortDescription:
      'Breathable latex comfort layer paired with a supportive high-density foam base.',
    description:
      'Features a buoyant pin-core latex top layer that responds quickly to movement while promoting airflow, supported by a durable foam foundation. Editable product entry ready for confirmed specifications.',
    images: createMattressImageSlots('Latex Mattress', [
      { src: latexPrimary, label: 'Construction Detail' },
    ]),
    materialType: 'Latex',
    material: 'Latex Comfort Layer + High-Density Foam Core',
    layers: [
      {
        name: 'Pin-Core Latex Comfort Layer',
        description: 'Aerated latex layer for responsive bounce and ventilation.',
      },
      {
        name: 'Supportive Foam Base',
        description: 'Stable foam foundation supporting even posture.',
      },
    ],
    firmness: 'Medium Firm',
    thicknessOptions: [6, 8, 10],
    sizeOptions: createStandardSizeOptions([6, 8, 10]),
    features: [
      'Aerated pin-core latex comfort layer',
      'Responsive bounce without sinking',
      'Breathable airflow design',
    ],
    coverInfo: 'Breathable cotton-blend knitted cover (editable placeholder)',
    warranty: null,
    additionalSpecs: [
      { label: 'Sleep Orientation', value: 'All Sleep Positions' },
      { label: 'Custom Sizing', value: 'Available on enquiry' },
    ],
    isPlaceholderEntry: true,
  },
  {
    id: 'full-latex-mattress',
    slug: 'full-latex-mattress',
    name: 'Full Latex Mattress',
    category: 'bed',
    mattressCategories: ['Latex Mattresses'],
    shortDescription:
      'All-latex mattress construction crafted for natural breathability and lasting resilience.',
    description:
      'Constructed entirely with layered latex cores for consistent buoyant support, open pin-core ventilation, and long-term elasticity. Editable product entry ready for confirmed latex specifications.',
    images: createMattressImageSlots('Full Latex Mattress', [
      { src: fullLatexPrimary, label: 'Primary View' },
    ]),
    materialType: 'Latex',
    material: 'Multi-Layer Full Latex Core',
    layers: [
      {
        name: 'Medium Comfort Latex Layer',
        description: 'Flexible top latex layer for gentle pressure distribution.',
      },
      {
        name: 'Firm Support Latex Core',
        description: 'Dense pin-core latex foundation for full-body support.',
      },
    ],
    firmness: 'Medium Firm',
    thicknessOptions: [6, 8],
    sizeOptions: createStandardSizeOptions([6, 8]),
    features: [
      'Full multi-layer latex construction',
      'Open pin-core ventilation throughout',
      'Resilient buoyant support',
    ],
    coverInfo: 'Breathable organic-style knitted cover (editable placeholder)',
    warranty: null,
    additionalSpecs: [
      { label: 'Core Construction', value: 'All-Latex Multi-Layer' },
      { label: 'Custom Sizing', value: 'Available on enquiry' },
    ],
    isPlaceholderEntry: true,
  },
  {
    id: 'latex-hybrid-mattress',
    slug: 'latex-hybrid-mattress',
    name: 'Latex Hybrid Mattress',
    category: 'bed',
    mattressCategories: ['Latex Mattresses', 'Spring & Hybrid Mattresses'],
    shortDescription:
      'Responsive latex comfort layer combined with an individually pocketed spring base.',
    description:
      'Pairs the breathable resilience of a latex comfort layer with the adaptive lift and airflow of an independent pocket spring core. Editable product entry ready for confirmed specifications.',
    images: createMattressImageSlots('Latex Hybrid Mattress', [
      { src: latexHybridPrimary, label: 'Primary View' },
      { src: latexHybridDetail, label: 'Alternate View' },
    ]),
    materialType: 'Hybrid',
    material: 'Latex Comfort Layer + Individually Wrapped Pocket Springs',
    layers: [
      {
        name: 'Aerated Latex Top Layer',
        description: 'Responsive, breathable surface layer for comfort.',
      },
      {
        name: 'Transition Cushion Layer',
        description: 'Separates coils cleanly from the comfort surface.',
      },
      {
        name: 'Pocket Spring Core',
        description: 'Individually encased coils that adapt independently to weight.',
      },
    ],
    firmness: 'Medium Firm',
    thicknessOptions: [8, 10],
    sizeOptions: createStandardSizeOptions([8, 10]),
    features: [
      'Breathable latex top layer',
      'Independent pocket spring support core',
      'Balanced lift and airflow',
    ],
    coverInfo: 'Quilted breathable jacquard cover (editable placeholder)',
    warranty: null,
    additionalSpecs: [
      { label: 'Core Construction', value: 'Latex + Pocket Spring Hybrid' },
      { label: 'Custom Sizing', value: 'Available on enquiry' },
    ],
    isPlaceholderEntry: true,
  },
  {
    id: 'pocket-spring-mattress',
    slug: 'pocket-spring-mattress',
    name: 'Pocket Spring Mattress',
    category: 'bed',
    mattressCategories: ['Spring & Hybrid Mattresses'],
    shortDescription:
      'Individually encased pocket spring mattress with cushioned comfort quilting.',
    description:
      'Uses individually wrapped coils that compress independently to contour to body shape while minimizing partner disturbance compared to traditional linked springs. Editable product entry.',
    images: createMattressImageSlots('Pocket Spring Mattress', [
      { src: pocketSpringPrimary, label: 'Primary View' },
      { src: pocketSpringDetail, label: 'Surface Detail' },
      { src: pocketSpringConstruction, label: 'Spring Construction' },
    ]),
    materialType: 'Pocket Spring',
    material: 'Individually Wrapped Pocket Springs + Foam Comfort Top',
    layers: [
      {
        name: 'Quilted Foam Comfort Top',
        description: 'Soft cushioning surface over the spring assembly.',
      },
      {
        name: 'Independent Pocket Coil Core',
        description: 'Individual fabric-encased springs for localized response.',
      },
      {
        name: 'Foam Edge Encasement',
        description: 'Perimeter foam border for sitting and sleeping edge stability.',
      },
    ],
    firmness: 'Medium Soft',
    thicknessOptions: [8, 10],
    sizeOptions: createStandardSizeOptions([8, 10]),
    features: [
      'Individually encased pocket coils',
      'Reduced motion transfer across the bed',
      'Cushioned quilted top finish',
    ],
    coverInfo: 'Quilted knitted mattress ticking (editable placeholder)',
    warranty: null,
    additionalSpecs: [
      { label: 'Spring Type', value: 'Independent Pocket Coils' },
      { label: 'Custom Sizing', value: 'Available on enquiry' },
    ],
    isPlaceholderEntry: true,
  },
  {
    id: 'grid-mattress',
    slug: 'grid-mattress',
    name: 'Grid Mattress',
    category: 'bed',
    mattressCategories: ['Grid Mattresses'],
    shortDescription:
      'Flexible polymer grid surface engineered for open airflow and adaptive pressure relief.',
    description:
      'Built with an open-channel elastic polymer grid top layer over a supportive foam base to flex under pressure points while allowing continuous air circulation. Editable product entry.',
    images: createMattressImageSlots('Grid Mattress', [
      { src: gridPrimary, label: 'Primary View' },
      { src: gridConstruction, label: 'Construction Detail' },
      { src: gridSurface, label: 'Surface Detail' },
    ]),
    materialType: 'Polymer Grid',
    material: 'Hyper-Elastic Polymer Grid + Support Foam Base',
    layers: [
      {
        name: 'Elastic Polymer Grid Layer',
        description: 'Open-grid structure that flexes under pressure and promotes ventilation.',
      },
      {
        name: 'High-Density Foam Base',
        description: 'Solid foam foundation supporting overall alignment.',
      },
    ],
    firmness: 'Medium Firm',
    thicknessOptions: [6, 8, 10],
    sizeOptions: createStandardSizeOptions([6, 8, 10]),
    features: [
      'Open-channel polymer grid top layer',
      'Enhanced airflow for cooler sleep',
      'Adaptive pressure point cradling',
    ],
    coverInfo: 'Stretch breathable knit cover (editable placeholder)',
    warranty: null,
    additionalSpecs: [
      { label: 'Top Surface', value: 'Elastic Polymer Grid' },
      { label: 'Custom Sizing', value: 'Available on enquiry' },
    ],
    isPlaceholderEntry: true,
  },
  {
    id: 'grid-hybrid-mattress',
    slug: 'grid-hybrid-mattress',
    name: 'Grid Hybrid Mattress',
    category: 'bed',
    mattressCategories: ['Grid Mattresses', 'Spring & Hybrid Mattresses'],
    shortDescription:
      'Polymer grid comfort layer paired with a supportive pocket spring base.',
    description:
      'Combines an open-airflow elastic grid top with an independent pocket spring foundation for cooling breathability, pressure relief, and responsive support. Editable product entry.',
    images: createMattressImageSlots('Grid Hybrid Mattress', [
      { src: gridHybridPrimary, label: 'Primary View' },
    ]),
    materialType: 'Hybrid',
    material: 'Polymer Grid + Pocket Spring Core',
    layers: [
      {
        name: 'Polymer Grid Comfort Layer',
        description: 'Flexible grid layer for targeted pressure relief and ventilation.',
      },
      {
        name: 'Transition Foam Buffer',
        description: 'Smoothly bridges the grid surface to the coil base.',
      },
      {
        name: 'Pocket Spring Foundation',
        description: 'Individually pocketed coils for responsive support.',
      },
    ],
    firmness: 'Medium Firm',
    thicknessOptions: [8, 10],
    sizeOptions: createStandardSizeOptions([8, 10]),
    features: [
      'Polymer grid cooling comfort top',
      'Independent pocket spring foundation',
      'Responsive multi-zone support',
    ],
    coverInfo: 'Breathable stretch-knit outer cover (editable placeholder)',
    warranty: null,
    additionalSpecs: [
      { label: 'Core Construction', value: 'Polymer Grid + Pocket Springs' },
      { label: 'Custom Sizing', value: 'Available on enquiry' },
    ],
    isPlaceholderEntry: true,
  },
  {
    id: 'dual-comfort-mattress',
    slug: 'dual-comfort-mattress',
    name: 'Dual Comfort Mattress',
    category: 'bed',
    mattressCategories: ['Dual Comfort Mattresses', 'Foam Mattresses'],
    shortDescription:
      'Reversible dual-sided foam mattress with a softer side and a firmer side.',
    description:
      'Designed to be flipped according to your comfort preference: one side offers a gentler medium-soft feel while the reverse provides firmer support. Editable product entry.',
    images: createMattressImageSlots('Dual Comfort Mattress', [
      { src: dualComfortPrimary, label: 'Primary View' },
      { src: dualComfortDetail, label: 'Comfort Sides' },
    ]),
    materialType: 'Foam',
    material: 'Dual-Density Reversible Foam Core',
    layers: [
      {
        name: 'Medium-Soft Comfort Side',
        description: 'Cushioned foam layer for a gentler sleep feel.',
      },
      {
        name: 'Firm Support Side',
        description: 'Higher-density foam side for firmer back support.',
      },
    ],
    firmness: 'Dual Feel (Medium Soft / Firm)',
    thicknessOptions: [5, 6, 8],
    sizeOptions: createStandardSizeOptions([5, 6, 8]),
    features: [
      'Usable on both sides (reversible)',
      'Medium-soft side and firm support side',
      'Breathable fabric outer cover',
    ],
    coverInfo: 'Breathable reversible outer fabric (editable placeholder)',
    warranty: null,
    additionalSpecs: [
      { label: 'Usability', value: 'Dual-sided / Flip to choose feel' },
      { label: 'Custom Sizing', value: 'Available on enquiry' },
    ],
    isPlaceholderEntry: true,
  },
  {
    id: 'rebonded-mattress',
    slug: 'rebonded-mattress',
    name: 'Rebonded Mattress',
    category: 'bed',
    mattressCategories: ['Rebonded Mattresses', 'Orthopedic Mattresses'],
    shortDescription:
      'High-density compressed rebonded foam mattress for firm, stable back support.',
    description:
      'Engineered around a dense compressed rebonded foam core that delivers an even, firm surface with strong resistance to sinking. Editable product entry ready for confirmed specifications.',
    images: createMattressImageSlots('Rebonded Mattress', [
      { src: rebondedPrimary, label: 'Primary View' },
      { src: rebondedConstruction, label: 'Construction Detail' },
      { src: rebondedCore, label: 'Core Detail' },
    ]),
    materialType: 'Rebonded Foam',
    material: 'High-Density Compressed Rebonded Foam Core',
    layers: [
      {
        name: 'Quilted Comfort Top',
        description: 'Lightly cushioned surface quilting for sleeping comfort.',
      },
      {
        name: 'High-Density Rebonded Core',
        description: 'Firm, dense compressed foam slab for steady spinal support.',
      },
    ],
    firmness: 'Firm',
    thicknessOptions: [4, 5, 6, 8],
    sizeOptions: createStandardSizeOptions([4, 5, 6, 8]),
    features: [
      'Firm high-density rebonded foam core',
      'Strong resistance to sagging',
      'Stable flat posture support',
    ],
    coverInfo: 'Durable quilted woven outer cover (editable placeholder)',
    warranty: null,
    additionalSpecs: [
      { label: 'Recommended For', value: 'Sleepers preferring firm support' },
      { label: 'Custom Sizing', value: 'Available on enquiry' },
    ],
    isPlaceholderEntry: true,
  },
  {
    id: 'hr-foam-mattress',
    slug: 'hr-foam-mattress',
    name: 'HR Foam Mattress',
    category: 'bed',
    mattressCategories: ['HR Foam Mattresses', 'Foam Mattresses'],
    shortDescription:
      'High-resilience open-cell foam mattress delivering buoyant, everyday comfort.',
    description:
      'Crafted with open-cell High-Resilience (HR) foam that springs back quickly for effortless turning and consistent support across the entire sleep surface. Editable product entry.',
    images: createMattressImageSlots('HR Foam Mattress', [
      { src: hrPrimary, label: 'Primary View' },
      { src: hrConstruction, label: 'Construction Detail' },
      { src: hrFoamDetail, label: 'Foam Detail' },
    ]),
    materialType: 'HR Foam',
    material: 'High-Resilience (HR) Open-Cell Foam',
    layers: [
      {
        name: 'Quilted Surface Cover',
        description: 'Soft breathable fabric cover for comfortable touch.',
      },
      {
        name: 'High-Resilience Foam Core',
        description: 'Buoyant open-cell HR foam providing elastic support and ventilation.',
      },
    ],
    firmness: 'Medium Firm',
    thicknessOptions: [5, 6, 8],
    sizeOptions: createStandardSizeOptions([5, 6, 8]),
    features: [
      'Responsive open-cell HR foam core',
      'Easy movement without sinking sensation',
      'Breathable everyday foam structure',
    ],
    coverInfo: 'Breathable knitted fabric cover (editable placeholder)',
    warranty: null,
    additionalSpecs: [
      { label: 'Foam Type', value: 'High-Resilience (HR) Foam' },
      { label: 'Custom Sizing', value: 'Available on enquiry' },
    ],
    isPlaceholderEntry: true,
  },
  {
    id: 'trifold-foldable-mattress',
    slug: 'trifold-foldable-mattress',
    name: 'Trifold Mattress',
    category: 'bed',
    mattressCategories: ['Foldable & Diwan Mattresses', 'Foam Mattresses'],
    shortDescription:
      'Three-fold portable foam mattress for guest sleeping, travel, and easy storage.',
    description:
      'A practical three-panel folding foam mattress that unfolds quickly for guests or floor sleeping and folds away neatly when not in use. Editable product entry ready for confirmed specifications.',
    images: createMattressImageSlots('Trifold Mattress', [
      { src: trifoldPrimary, label: 'Primary View' },
      { src: trifoldDetail, label: 'Folded View' },
      { src: trifoldCover, label: 'Cover Detail' },
    ]),
    materialType: 'Foam',
    material: 'Supportive Polyurethane Foam (3-Panel Fold)',
    firmness: 'Medium Firm',
    thicknessOptions: [4, 5],
    sizeOptions: [
      {
        size: 'Single',
        dimensions: DEFAULT_MATTRESS_DIMENSIONS.Single,
        price: null,
        priceByThickness: { 4: null, 5: null },
      },
      {
        size: 'Double',
        dimensions: DEFAULT_MATTRESS_DIMENSIONS.Double,
        price: null,
        priceByThickness: { 4: null, 5: null },
      },
    ],
    features: [
      'Compact 3-fold space-saving design',
      'Lightweight and portable for guest rooms',
      'Zippered fabric outer cover',
    ],
    coverInfo: 'Durable removable fabric cover (editable placeholder)',
    warranty: null,
    additionalSpecs: [
      { label: 'Design', value: '3-Panel Foldable' },
      { label: 'Custom Sizing', value: 'Available on enquiry' },
    ],
    isPlaceholderEntry: true,
  },
  {
    id: 'diwan-mattress',
    slug: 'diwan-mattress',
    name: 'Diwan Mattress',
    category: 'bed',
    mattressCategories: ['Foldable & Diwan Mattresses'],
    shortDescription:
      'Firm foam mattress tailored for living room diwans, daybeds, and seating cots.',
    description:
      'Built with structured firm foam to hold its shape for both daytime sitting and overnight sleeping on standard or custom diwan frames. Editable product entry ready for confirmed specifications.',
    images: createMattressImageSlots('Diwan Mattress', [
      { src: diwanPrimary, label: 'Primary View' },
      { src: diwanDetail, label: 'Construction Detail' },
      { src: diwanRoom, label: 'Room View' },
    ]),
    materialType: 'Foam',
    material: 'High-Density Structured Foam',
    firmness: 'Firm',
    thicknessOptions: [4, 5, 6],
    sizeOptions: [
      {
        size: 'Diwan Standard',
        dimensions: '72 × 36 inches',
        price: null,
        priceByThickness: { 4: null, 5: null, 6: null },
      },
      {
        size: 'Diwan Wide',
        dimensions: '72 × 42 inches',
        price: null,
        priceByThickness: { 4: null, 5: null, 6: null },
      },
    ],
    features: [
      'Firm seating and sleeping support',
      'Sized for standard diwan frames',
      'Custom diwan dimensions on enquiry',
    ],
    coverInfo: 'Durable woven fabric outer cover (editable placeholder)',
    warranty: null,
    additionalSpecs: [
      { label: 'Use Case', value: 'Diwan / Daybed / Living Room Cot' },
      { label: 'Custom Sizing', value: 'Available on enquiry' },
    ],
    isPlaceholderEntry: true,
  },
  {
    id: 'baby-mattress',
    slug: 'baby-mattress',
    name: 'Baby Mattress',
    category: 'bed',
    mattressCategories: ['Baby Mattresses'],
    shortDescription:
      'Firm, flat breathable foam mattress sized for infant cribs and junior cots.',
    description:
      'A flat, firm sleeping surface crafted specifically for baby cribs and toddler cots with a soft, breathable outer cover. Editable product entry ready for confirmed specifications and custom crib dimensions.',
    images: createMattressImageSlots('Baby Mattress'),
    materialType: 'Foam',
    material: 'Breathable Firm Support Foam',
    firmness: 'Firm',
    thicknessOptions: [4, 5],
    sizeOptions: [
      {
        size: 'Crib Standard',
        dimensions: '52 × 28 inches',
        price: null,
        priceByThickness: { 4: null, 5: null },
      },
      {
        size: 'Junior Cot',
        dimensions: '60 × 30 inches',
        price: null,
        priceByThickness: { 4: null, 5: null },
      },
    ],
    features: [
      'Flat, firm support for infant posture',
      'Sized for cribs and junior cots',
      'Soft, breathable outer fabric cover',
    ],
    coverInfo: 'Soft removable breathable cover (editable placeholder)',
    warranty: null,
    additionalSpecs: [
      { label: 'Use Case', value: 'Infant Crib & Toddler Cot' },
      { label: 'Custom Sizing', value: 'Custom crib dimensions on enquiry' },
    ],
    isPlaceholderEntry: true,
  },
];

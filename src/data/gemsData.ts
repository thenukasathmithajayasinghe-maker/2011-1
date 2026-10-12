export interface Gemstone {
  id: string;
  name: string;
  tradeNames: string[];
  group: string;
  species: string;
  variety: string;
  chemicalFormula: string;
  crystalSystem: 'Hexagonal' | 'Isometric' | 'Tetragonal' | 'Orthorhombic' | 'Trigonal' | 'Monoclinic' | 'Triclinic' | 'Amorphous';
  hardness: number; // Mohs 1-10
  specificGravity: number; // Density g/cm³
  refractiveIndex: { min: number; max: number; spot?: number };
  birefringence: number;
  opticalCharacter: string;
  pleochroism: { type: string; colors: string[] };
  dispersion: number;
  luster: string;
  cleavage: string;
  fracture: string;
  colorHue: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Exceptional' | 'Museum Grade';
  treatmentStatus: 'Natural Unheated' | 'Heated' | 'Beryllium Diffused' | 'Untreated' | 'Oiled' | 'Irradiated' | 'Synthetic';
  originSriLankan: boolean;
  sriLankaRegions: string[];
  globalOrigins: string[];
  diagnosticInclusions: string[];
  microscopicClues: string;
  treatmentsGuide: string;
  valueFactors: {
    color: string;
    clarity: string;
    cut: string;
    carat: string;
    originPremium: string;
  };
  images: {
    faceted: string;
    rough: string;
    microscopic: string;
    spectrum: string;
  };
  caratDefault: number;
  certifiedBy: string;
  priceEstimateTier: '$$$' | '$$$$' | '$$$$$';
  inStock: boolean;
  featured: boolean;
  badge?: 'In Stock' | 'Limited' | 'Rare' | 'Museum Piece';
}

export const GEMS_DATABASE: Gemstone[] = [
  {
    id: 'ceylon-blue-sapphire',
    name: 'Ceylon Royal Blue Sapphire',
    tradeNames: ['Cornflower Blue Sapphire', 'Royal Blue', 'Ceylon Sapphire', 'Nil Manikkam'],
    group: 'Corundum',
    species: 'Corundum',
    variety: 'Blue Sapphire',
    chemicalFormula: 'Al₂O₃ + Fe²⁺/Ti⁴⁺ charge transfer',
    crystalSystem: 'Trigonal',
    hardness: 9.0,
    specificGravity: 4.00,
    refractiveIndex: { min: 1.762, max: 1.770, spot: 1.766 },
    birefringence: 0.008,
    opticalCharacter: 'Uniaxial negative (U-)',
    pleochroism: {
      type: 'Dichroic (Strong)',
      colors: ['Deep Royal / Violet-Blue (o-ray)', 'Greenish-Blue to Light Sky Blue (e-ray)']
    },
    dispersion: 0.018,
    luster: 'Vitreous to sub-adamantine',
    cleavage: 'None (Basal and rhombohedral parting {0001}, {1011})',
    fracture: 'Conchoidal to uneven',
    colorHue: 'Deep Vivid Royal Blue',
    rarity: 'Exceptional',
    treatmentStatus: 'Natural Unheated',
    originSriLankan: true,
    sriLankaRegions: ['Ratnapura', 'Pelmadulla', 'Balangoda', 'Elahera'],
    globalOrigins: ['Sri Lanka (Ceylon)', 'Madagascar (Ilakaka)', 'Kashmir (Historical)', 'Burma (Mogok)'],
    diagnosticInclusions: [
      'Unaltered long intersecting rutile needles (silk)',
      'Rounded zircon crystals with brown radioactive stress halo fissures',
      'Two-phase fluid and gas healing feathers (liquid fingerprints)',
      'Distinct angular hexagonal growth zoning'
    ],
    microscopicClues: 'Presence of sharp, intact rutile silk without melted snowball droplets proves unheated status.',
    treatmentsGuide: 'Traditional Geuda heating (Lakmini blowpipe or electrical furnace at 1600-1850°C) dissolves silk to deepen blue color by releasing Fe-Ti ions. Detectable by discoidal tension halos and internal sintering.',
    valueFactors: {
      color: 'Medium-dark pure blue hue with strong to vivid saturation; absence of secondary grey or green masks.',
      clarity: 'Eye clean (VS-VVS), transparent crystal without cloudy zoning.',
      cut: 'Precision cushion or oval brilliant maximizing internal reflection and preventing windowing.',
      carat: 'Substantial per-carat price step increases above 3ct, 5ct, and 10ct thresholds.',
      originPremium: 'Ceylon provenance commands a 30% to 65% premium over Madagascar material.'
    },
    images: {
      faceted: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      rough: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=1000&q=80',
      microscopic: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      spectrum: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80'
    },
    caratDefault: 4.2,
    certifiedBy: 'GIA & Gübelin Certified (Origin: Sri Lanka, Unheated)',
    priceEstimateTier: '$$$$$',
    inStock: true,
    featured: true,
    badge: 'In Stock'
  },
  {
    id: 'ceylon-ruby',
    name: 'Ceylon Pigeon Blood Ruby',
    tradeNames: ['Burmese Pigeon Blood', 'Ceylon Ruby', 'Ratna Ruby', 'Rathnam'],
    group: 'Corundum',
    species: 'Corundum',
    variety: 'Ruby',
    chemicalFormula: 'Al₂O₃ + Cr³⁺',
    crystalSystem: 'Trigonal',
    hardness: 9.0,
    specificGravity: 4.02,
    refractiveIndex: { min: 1.762, max: 1.770, spot: 1.765 },
    birefringence: 0.008,
    opticalCharacter: 'Uniaxial negative (U-)',
    pleochroism: {
      type: 'Dichroic (Strong)',
      colors: ['Vivid Purplish-Red', 'Orange-Red']
    },
    dispersion: 0.018,
    luster: 'Sub-adamantine to vitreous',
    cleavage: 'None (Rhombohedral parting)',
    fracture: 'Conchoidal',
    colorHue: 'Vivid Pigeon Blood Crimson Red with High Fluorescence',
    rarity: 'Exceptional',
    treatmentStatus: 'Heated',
    originSriLankan: true,
    sriLankaRegions: ['Pelmadulla', 'Ratnapura', 'Kataragama'],
    globalOrigins: ['Sri Lanka', 'Burma (Mogok/Mong Hsu)', 'Mozambique (Montepuez)'],
    diagnosticInclusions: [
      'Boehmite needles intersecting along parting planes',
      'Calcite and apatite crystal protogenetic inclusions',
      'Strong red fluorescence under 365nm UV due to low iron and high chromium'
    ],
    microscopicClues: 'Ceylon rubies exhibit intensely bright natural UV fluorescence due to minimal Fe quenching compared to Thai stones.',
    treatmentsGuide: 'Low to moderate temperature thermal enhancement to heal fractures and optimize color; flux-healed or glass-filled stones are strictly cataloged.',
    valueFactors: {
      color: 'Primary pure red with minimal purple modifier; high chroma and lively inner glow.',
      clarity: 'Slight inclusions tolerated; stones must remain transparent without dull clouding.',
      cut: 'Oval and octagonal step cuts preserving carat weight while minimizing extinction.',
      carat: 'Clean unheated stones over 2ct are extremely scarce in world auctions.',
      originPremium: 'Historic Ceylon ruby commands collectors premium for ethical, traceable provenance.'
    },
    images: {
      faceted: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1000&q=80',
      rough: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=1000&q=80',
      microscopic: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      spectrum: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80'
    },
    caratDefault: 2.8,
    certifiedBy: 'GIA Certified (Origin: Sri Lanka, Heat Treated)',
    priceEstimateTier: '$$$$',
    inStock: true,
    featured: true,
    badge: 'Limited'
  },
  {
    id: 'padparadscha-sapphire',
    name: 'Balangoda Padparadscha Sapphire',
    tradeNames: ['King of Sapphires', 'Lotus Blossom Sapphire', 'Padma Raga', 'Sunset Sapphire'],
    group: 'Corundum',
    species: 'Corundum',
    variety: 'Padparadscha',
    chemicalFormula: 'Al₂O₃ + Cr³⁺ + Fe³⁺ (balanced color centers)',
    crystalSystem: 'Trigonal',
    hardness: 9.0,
    specificGravity: 4.00,
    refractiveIndex: { min: 1.762, max: 1.770, spot: 1.766 },
    birefringence: 0.008,
    opticalCharacter: 'Uniaxial negative (U-)',
    pleochroism: {
      type: 'Dichroic (Distinct)',
      colors: ['Pinkish-Orange', 'Yellowish-Pink to Sunset Salmon']
    },
    dispersion: 0.018,
    luster: 'Vitreous',
    cleavage: 'None (Parting along twinning planes)',
    fracture: 'Conchoidal',
    colorHue: 'Delicate blend of Pink and Orange (Lotus Blossom)',
    rarity: 'Museum Grade',
    treatmentStatus: 'Natural Unheated',
    originSriLankan: true,
    sriLankaRegions: ['Balangoda', 'Pelmadulla', 'Ratnapura'],
    globalOrigins: ['Sri Lanka (Ceylon - Original reference standard)', 'Madagascar', 'Tanzania'],
    diagnosticInclusions: [
      'Delicate intersecting rutile silk with no thermal distortion',
      'Negative crystal cavities filled with CO₂ and liquid diaspore',
      'Absence of internal orange surface-diffusion halo under immersion cell'
    ],
    microscopicClues: 'Immersion in methylene iodide reveals uniform internal color distribution, confirming natural color center rather than beryllium lattice diffusion.',
    treatmentsGuide: 'Be-diffusion (Beryllium lattice diffusion at 1800°C+) creates deceptive synthetic padparadscha colors in pale corundum. Detected by LA-ICP-MS mass spectrometry and immersion testing.',
    valueFactors: {
      color: 'Strict harmony: neither pink nor orange should dominate more than 55/45 ratio; pastel to medium saturation without brownish tint.',
      clarity: 'High transparency is vital to showcase delicate floral coloration.',
      cut: 'Brilliant pavilion with step crown to maximize scintillation and color blending.',
      carat: 'Specimens exceeding 2 carats with natural unheated GIA/SSEF certificates are exceedingly rare.',
      originPremium: 'Sri Lankan historical Balangoda material commands the apex price worldwide.'
    },
    images: {
      faceted: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80',
      rough: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=1000&q=80',
      microscopic: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      spectrum: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80'
    },
    caratDefault: 1.9,
    certifiedBy: 'GIA & SSEF Certified (Natural Padparadscha, Unheated)',
    priceEstimateTier: '$$$$$',
    inStock: true,
    featured: true,
    badge: 'Rare'
  },
  {
    id: 'chrysoberyl-cats-eye',
    name: 'Ratnapura Chrysoberyl Cat’s Eye',
    tradeNames: ['Cymophane', 'Vaidooriam', 'Milk and Honey Cat’s Eye'],
    group: 'Chrysoberyl',
    species: 'Chrysoberyl',
    variety: 'Cymophane (Cat’s Eye)',
    chemicalFormula: 'BeAl₂O₄ + Fe³⁺ (dense rutile silk tubes)',
    crystalSystem: 'Orthorhombic',
    hardness: 8.5,
    specificGravity: 3.73,
    refractiveIndex: { min: 1.746, max: 1.755, spot: 1.750 },
    birefringence: 0.009,
    opticalCharacter: 'Biaxial positive (B+)',
    pleochroism: {
      type: 'Trichroic (Weak to moderate)',
      colors: ['Greenish-Yellow', 'Honey-Brown', 'Golden Amber']
    },
    dispersion: 0.015,
    luster: 'Vitreous to greasy on polished dome',
    cleavage: 'Distinct along {110}, imperfect along {010}',
    fracture: 'Conchoidal to uneven',
    colorHue: 'Rich Golden Honey Brown with Silvery Chatoyant Ray',
    rarity: 'Museum Grade',
    treatmentStatus: 'Natural Unheated',
    originSriLankan: true,
    sriLankaRegions: ['Ratnapura', 'Pelmadulla', 'Elahera'],
    globalOrigins: ['Sri Lanka (Ceylon)', 'Brazil (Minas Gerais)', 'Madagascar', 'India (Orissa)'],
    diagnosticInclusions: [
      'Dense parallel sub-microscopic rutile needles oriented parallel to the c-axis',
      'Two-phase fluid planes producing the shimmering Cymophane effect',
      'Milk and honey optical phenomenon: dividing light beam splits dome into opaque milky side and transparent honey side'
    ],
    microscopicClues: 'Microscopic inspection verifies parallel channels of rutile causing true chatoyancy rather than surface fiber optic glass simulant.',
    treatmentsGuide: 'Natural chrysoberyl cat’s eye is almost never treated with heat; beware of irradiated dark brown specimens or synthetic quartz/glass simulants.',
    valueFactors: {
      color: 'Warm honey or apple green with distinct two-tone milk-and-honey splitting under single light source.',
      clarity: 'Translucent body with razor-sharp, centered, unbroken chatoyant band that glides smoothly across dome.',
      cut: 'High-domed cabochon with flat or slightly convex unpolished base.',
      carat: 'Fine quality stones above 5 carats are investment grade.',
      originPremium: 'Sri Lankan provenance is universally revered as the historic gold standard for cymophane.'
    },
    images: {
      faceted: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      rough: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=1000&q=80',
      microscopic: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      spectrum: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80'
    },
    caratDefault: 5.6,
    certifiedBy: 'GCIA & Gübelin Certified (Origin: Sri Lanka, Natural Unheated)',
    priceEstimateTier: '$$$$$',
    inStock: true,
    featured: true,
    badge: 'Museum Piece'
  },
  {
    id: 'ceylon-alexandrite',
    name: 'Elahera Alexandrite Chrysoberyl',
    tradeNames: ['Emerald by Day, Ruby by Night', 'Color Change Chrysoberyl'],
    group: 'Chrysoberyl',
    species: 'Chrysoberyl',
    variety: 'Alexandrite',
    chemicalFormula: 'BeAl₂O₄ + Cr³⁺',
    crystalSystem: 'Orthorhombic',
    hardness: 8.5,
    specificGravity: 3.73,
    refractiveIndex: { min: 1.746, max: 1.755, spot: 1.750 },
    birefringence: 0.009,
    opticalCharacter: 'Biaxial positive (B+)',
    pleochroism: {
      type: 'Trichroic (Extremely Strong)',
      colors: ['Bluish-Green', 'Orange-Yellow', 'Raspberry Purple-Red']
    },
    dispersion: 0.015,
    luster: 'Vitreous',
    cleavage: 'Distinct along {110}',
    fracture: 'Conchoidal',
    colorHue: 'Teal Green (Daylight) to Raspberry Violet-Red (Incandescent)',
    rarity: 'Museum Grade',
    treatmentStatus: 'Untreated',
    originSriLankan: true,
    sriLankaRegions: ['Elahera', 'Ratnapura', 'Balangoda'],
    globalOrigins: ['Sri Lanka', 'Russia (Ural Mountains - Historical)', 'Brazil (Hematita)', 'Tanzania'],
    diagnosticInclusions: [
      'Fluorite crystal inclusions and flat tabular negative crystals',
      'Multiphase fluid tubes oriented parallel to crystallographic axes',
      'Twin planes with cyclic trilling morphology'
    ],
    microscopicClues: 'Spectroscopic absorption spectrum shows sharp chromium doublet at 680.5nm and strong absorption band centered at 580nm.',
    treatmentsGuide: 'Alexandrite is rarely treated. Beware of synthetic flux-grown or Czochralski pulled stones (revealed by curved striations and platinum platelet inclusions).',
    valueFactors: {
      color: 'Percentage of color change: 100% complete color shift from pure green to pure red commands astronomical valuations.',
      clarity: 'Eye-clean clarity is exceedingly rare; Ceylon stones often offer larger size and superior transparency.',
      cut: 'Custom brilliant cut tailored to align the primary color axes with the table facet.',
      carat: 'Stones above 1.5ct with high saturation color change are auction headliners.',
      originPremium: 'Elahera Sri Lankan gems are prized for clean transparency and prominent shifts.'
    },
    images: {
      faceted: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80',
      rough: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=1000&q=80',
      microscopic: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      spectrum: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80'
    },
    caratDefault: 1.45,
    certifiedBy: 'GIA Certified (Natural Alexandrite, 90% Color Shift)',
    priceEstimateTier: '$$$$$',
    inStock: true,
    featured: true,
    badge: 'Rare'
  },
  {
    id: 'ceylon-cobalt-spinel',
    name: 'Elahera Cobalt Blue Spinel',
    tradeNames: ['Electric Blue Spinel', 'Cobalt Spinel', 'Neon Blue Spinel'],
    group: 'Spinel',
    species: 'Spinel',
    variety: 'Cobalt Spinel',
    chemicalFormula: 'MgAl₂O₄ + Co²⁺',
    crystalSystem: 'Isometric',
    hardness: 8.0,
    specificGravity: 3.60,
    refractiveIndex: { min: 1.718, max: 1.718, spot: 1.718 },
    birefringence: 0.000,
    opticalCharacter: 'Isotropic (Single Refractive, SR)',
    pleochroism: {
      type: 'None (Isotropic)',
      colors: ['Single Uniform Electric Cyan-Blue']
    },
    dispersion: 0.020,
    luster: 'Vitreous to sub-adamantine',
    cleavage: 'None (Indistinct octahedral parting)',
    fracture: 'Conchoidal',
    colorHue: 'Vivid Neon Electric Blue with no Grey Mask',
    rarity: 'Museum Grade',
    treatmentStatus: 'Untreated',
    originSriLankan: true,
    sriLankaRegions: ['Elahera', 'Ratnapura'],
    globalOrigins: ['Sri Lanka (Ceylon)', 'Vietnam (Luc Yen)', 'Tanzania (Mahenge)'],
    diagnosticInclusions: [
      'Octahedral negative crystals arranged in planar sheets (spinel inclusions within spinel)',
      'Apatite and calcite crystal clusters',
      'Diagnostic three cobalt absorption bands in visible spectrum at 458, 480, and 625nm'
    ],
    microscopicClues: 'Single refractive optical behavior under polariscope; stays completely dark through 360-degree rotation (unlike double refractive sapphire).',
    treatmentsGuide: 'Spinel is completely unheated and untreated. Cobalt color is 100% natural; beware of synthetic flame-fusion blue spinel which displays chalky red under Chelsea filter and RI 1.728.',
    valueFactors: {
      color: 'Intense cobalt cyan blue without dark iron overtones; high brightness.',
      clarity: 'VVS or eye-clean transparency maximizes vivid neon dispersion.',
      cut: 'Cushion brilliant cut enhancing internal dispersion flashes.',
      carat: 'Specimens above 1ct are rare; above 3ct are world-class collectors treasures.',
      originPremium: 'Sri Lankan and Vietnamese cobalt spinels lead global auction records.'
    },
    images: {
      faceted: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      rough: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=1000&q=80',
      microscopic: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      spectrum: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80'
    },
    caratDefault: 2.15,
    certifiedBy: 'SSEF Certified (Natural Spinel, Cobalt Colored, Unheated)',
    priceEstimateTier: '$$$$$',
    inStock: true,
    featured: false,
    badge: 'Rare'
  },
  {
    id: 'meetiyagoda-moonstone',
    name: 'Meetiyagoda Blue Sheen Moonstone',
    tradeNames: ['Ceylon Moonstone', 'Adularia', 'Blue Flash Moonstone', 'Chandrakanthi'],
    group: 'Feldspar',
    species: 'Orthoclase / Albite',
    variety: 'Moonstone (Adularescence)',
    chemicalFormula: 'KAlSi₃O₈ with NaAlSi₃O₈ intergrowths',
    crystalSystem: 'Monoclinic',
    hardness: 6.0,
    specificGravity: 2.56,
    refractiveIndex: { min: 1.518, max: 1.526, spot: 1.520 },
    birefringence: 0.008,
    opticalCharacter: 'Biaxial negative (B-)',
    pleochroism: {
      type: 'Weak',
      colors: ['Colorless', 'Silvery Sheen']
    },
    dispersion: 0.012,
    luster: 'Vitreous to pearly on cleavage planes',
    cleavage: 'Perfect along {001}, good along {010} (at 90 degrees)',
    fracture: 'Uneven to conchoidal',
    colorHue: 'Colorless Transparent Body with Floating Electric Blue Adularescent Schiller',
    rarity: 'Rare',
    treatmentStatus: 'Untreated',
    originSriLankan: true,
    sriLankaRegions: ['Meetiyagoda (Galle District)'],
    globalOrigins: ['Sri Lanka (Meetiyagoda - World’s premier source)', 'India', 'Madagascar', 'Myanmar'],
    diagnosticInclusions: [
      'Characteristic "centipede" inclusions (stress fissures along albite lamellae)',
      'Sub-microscopic exsolution lamellae creating light scattering (Tyndall effect)',
      'Negative crystals along twinning planes'
    ],
    microscopicClues: 'The alternating microscopically thin layers of orthoclase and albite scatter shorter blue wavelengths, creating celestial blue glow.',
    treatmentsGuide: 'Natural untreated; never heat treated due to low melting points and risk of shattering along cleavage planes.',
    valueFactors: {
      color: 'Pure water-clear transparent body glass with vibrant, centered electric blue flash floating on dome.',
      clarity: 'Absence of visible internal centipede cracks near surface.',
      cut: 'High-domed oval cabochon precisely oriented perpendicular to lamellae layers.',
      carat: 'Fine blue stones over 10 carats from Meetiyagoda are classic collector centerpieces.',
      originPremium: 'Meetiyagoda is universally recognized as the historical and qualitative benchmark.'
    },
    images: {
      faceted: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80',
      rough: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=1000&q=80',
      microscopic: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      spectrum: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80'
    },
    caratDefault: 8.4,
    certifiedBy: 'GCIA Certified (Meetiyagoda Sri Lanka, Unheated Natural)',
    priceEstimateTier: '$$$',
    inStock: true,
    featured: false,
    badge: 'In Stock'
  },
  {
    id: 'colombian-emerald',
    name: 'Muzo Colombian Vivid Green Emerald',
    tradeNames: ['Colombian Emerald', 'Muzo Green', 'Panna', 'Old Mine Emerald'],
    group: 'Beryl',
    species: 'Beryl',
    variety: 'Emerald',
    chemicalFormula: 'Be₃Al₂Si₆O₁₈ + Cr³⁺, V³⁺',
    crystalSystem: 'Hexagonal',
    hardness: 7.5,
    specificGravity: 2.72,
    refractiveIndex: { min: 1.577, max: 1.583, spot: 1.580 },
    birefringence: 0.006,
    opticalCharacter: 'Uniaxial negative (U-)',
    pleochroism: {
      type: 'Dichroic (Distinct)',
      colors: ['Bluish-Green', 'Yellowish-Green']
    },
    dispersion: 0.014,
    luster: 'Vitreous',
    cleavage: 'Imperfect basal cleavage {0001}',
    fracture: 'Conchoidal to uneven',
    colorHue: 'Intense Pure Emerald Green with Velvety Warmth',
    rarity: 'Exceptional',
    treatmentStatus: 'Untreated',
    originSriLankan: false,
    sriLankaRegions: [],
    globalOrigins: ['Colombia (Muzo, Chivor, Coscuez)', 'Zambia (Kagem)', 'Brazil', 'Afghanistan (Panjshir)'],
    diagnosticInclusions: [
      'Diagnostic jagged three-phase inclusions (jagged cavity enclosing liquid, gas bubble, and cubic rock salt halite crystal)',
      'Calcite and pyrite crystals',
      'Growth tube "jardin" inclusions confirming natural hydrothermal origin'
    ],
    microscopicClues: 'Three-phase inclusion with cubic halite crystal is definitive proof of Colombian origin.',
    treatmentsGuide: 'Traditional clarity enhancement with cedarwood oil or synthetic resins (Opticon). Laboratory reports grade clarity enhancement from Minor to Significant.',
    valueFactors: {
      color: 'Pure intense green hue with saturated tone and minimal secondary yellow/blue modifier.',
      clarity: 'Minor or no clarity enhancement (Jardin that does not affect durability).',
      cut: 'Traditional emerald cut with cut corners protecting fragile crystal edges.',
      carat: 'No-oil certified stones over 3ct trade at extraordinary multi-million dollar levels.',
      originPremium: 'Muzo Colombian provenance carries the premier global market recognition.'
    },
    images: {
      faceted: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      rough: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=1000&q=80',
      microscopic: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      spectrum: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80'
    },
    caratDefault: 3.5,
    certifiedBy: 'GIA & Gübelin Certified (Origin: Colombia, Insignificant Oil)',
    priceEstimateTier: '$$$$$',
    inStock: true,
    featured: false,
    badge: 'Museum Piece'
  },
  {
    id: 'paraiba-tourmaline',
    name: 'Batalha Neon Paraíba Tourmaline',
    tradeNames: ['Electric Paraíba', 'Cuprian Tourmaline', 'Neon Turquoise Tourmaline'],
    group: 'Tourmaline',
    species: 'Elbaite',
    variety: 'Paraíba Tourmaline',
    chemicalFormula: 'Na(Li,Al)₃Al₆(BO₃)₃Si₆O₁₈(OH)₄ + Cu²⁺, Mn³⁺',
    crystalSystem: 'Trigonal',
    hardness: 7.5,
    specificGravity: 3.06,
    refractiveIndex: { min: 1.624, max: 1.644, spot: 1.635 },
    birefringence: 0.020,
    opticalCharacter: 'Uniaxial negative (U-)',
    pleochroism: {
      type: 'Dichroic (Strong)',
      colors: ['Electric Neon Turquoise-Blue', 'Vivid Apple Green']
    },
    dispersion: 0.017,
    luster: 'Vitreous',
    cleavage: 'None (Indistinct parting)',
    fracture: 'Conchoidal',
    colorHue: 'Unearthly Glowing Electric Neon Cyan-Blue',
    rarity: 'Museum Grade',
    treatmentStatus: 'Heated',
    originSriLankan: false,
    sriLankaRegions: [],
    globalOrigins: ['Brazil (São José da Batalha, Paraíba State)', 'Mozambique (Mavuco)', 'Nigeria (Edoukou)'],
    diagnosticInclusions: [
      'Liquid-filled trichites and parallel capillary tubes',
      'Native copper platelets causing metallic glitter in rare specimens',
      'High copper concentration (up to 2.5 wt% CuO) detectable by EDXRF spectroscopy'
    ],
    microscopicClues: 'Chemical composition analysis via EDXRF or LA-ICP-MS reveals trace copper responsible for fluorescent neon blue glow.',
    treatmentsGuide: 'Gentle low-temperature heating (500-600°C) is routinely applied to eliminate purple manganese component and isolate pure electric blue.',
    valueFactors: {
      color: 'Intensity of glowing neon blue saturation and cyan brilliance.',
      clarity: 'Inclusions are widely accepted due to extreme crystal stress during pegmatite formation.',
      cut: 'Oval and pear brilliant cuts maximizing table brilliance.',
      carat: 'Original Brazilian gems above 1ct are extraordinarily rare; above 3ct are historic.',
      originPremium: 'Brazilian Batalha material commands up to $100,000+ per carat.'
    },
    images: {
      faceted: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80',
      rough: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=1000&q=80',
      microscopic: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      spectrum: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80'
    },
    caratDefault: 1.85,
    certifiedBy: 'SSEF Certified (Copper-bearing Paraíba Tourmaline, Brazil)',
    priceEstimateTier: '$$$$$',
    inStock: true,
    featured: false,
    badge: 'Rare'
  },
  {
    id: 'tsavorite-garnet',
    name: 'Merelani Vivid Tsavorite Garnet',
    tradeNames: ['Tsavorite', 'Tsavolite', 'Green Grossular Garnet'],
    group: 'Garnet',
    species: 'Grossular',
    variety: 'Tsavorite',
    chemicalFormula: 'Ca₃Al₂(SiO₄)₃ + V³⁺, Cr³⁺',
    crystalSystem: 'Isometric',
    hardness: 7.5,
    specificGravity: 3.61,
    refractiveIndex: { min: 1.740, max: 1.740, spot: 1.740 },
    birefringence: 0.000,
    opticalCharacter: 'Isotropic (Single Refractive)',
    pleochroism: {
      type: 'None (Isotropic)',
      colors: ['Single Uniform Emerald Green']
    },
    dispersion: 0.028,
    luster: 'Vitreous to sub-adamantine',
    cleavage: 'None',
    fracture: 'Conchoidal',
    colorHue: 'Intense Pure Emerald Green with High Dispersion Fire',
    rarity: 'Rare',
    treatmentStatus: 'Untreated',
    originSriLankan: false,
    sriLankaRegions: [],
    globalOrigins: ['Kenya (Tsavo National Park)', 'Tanzania (Merelani / Lemshuku)', 'Madagascar'],
    diagnosticInclusions: [
      'Apatite and graphite crystal platelets',
      'Fingerprint fluid feathers and needle-like inclusions',
      'Absence of double refraction; high dispersion fire compared to emerald'
    ],
    microscopicClues: 'Under polariscope, remains dark without extinction lines; refractometer gives sharp single reading at 1.740.',
    treatmentsGuide: 'Tsavorite is 100% natural and untreated; cannot be enhanced by heat or irradiation.',
    valueFactors: {
      color: 'Rich velvety green resembling finest Colombian emerald with higher refractive brilliance.',
      clarity: 'Eye-clean specimens are substantially cleaner and tougher than emeralds.',
      cut: 'Brilliant faceted styles take advantage of high optical dispersion (0.028).',
      carat: 'Specimens over 3 carats are rare; over 5 carats are investment treasures.',
      originPremium: 'East African original Tsavo discoveries set value benchmark.'
    },
    images: {
      faceted: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      rough: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=1000&q=80',
      microscopic: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      spectrum: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80'
    },
    caratDefault: 3.12,
    certifiedBy: 'GIA Certified (Natural Grossular Tsavorite, Untreated)',
    priceEstimateTier: '$$$$',
    inStock: true,
    featured: false,
    badge: 'In Stock'
  },
  {
    id: 'ceylon-star-sapphire',
    name: 'Ratnapura 6-Ray Star Sapphire',
    tradeNames: ['Asteria', 'Star Sapphire', 'Thara Manikkam'],
    group: 'Corundum',
    species: 'Corundum',
    variety: 'Star Sapphire',
    chemicalFormula: 'Al₂O₃ + dense oriented TiO₂ needles',
    crystalSystem: 'Trigonal',
    hardness: 9.0,
    specificGravity: 4.00,
    refractiveIndex: { min: 1.762, max: 1.770, spot: 1.766 },
    birefringence: 0.008,
    opticalCharacter: 'Uniaxial negative (U-)',
    pleochroism: {
      type: 'Dichroic',
      colors: ['Sky Blue', 'Violet-Blue']
    },
    dispersion: 0.018,
    luster: 'Vitreous to silky sheen',
    cleavage: 'None (Basal parting)',
    fracture: 'Conchoidal to uneven',
    colorHue: 'Cornflower to Medium Blue with Sharp 6-Ray Star',
    rarity: 'Rare',
    treatmentStatus: 'Natural Unheated',
    originSriLankan: true,
    sriLankaRegions: ['Ratnapura', 'Pelmadulla'],
    globalOrigins: ['Sri Lanka (Ceylon - Star of India origin)', 'Burma', 'Madagascar'],
    diagnosticInclusions: [
      'Dense, perfectly oriented rutile needles intersecting at 60°/120° angles parallel to second-order prism faces',
      'Twinning planes and silk bands visible along base',
      'Sharp asterism moving dynamically with light source point'
    ],
    microscopicClues: 'Under fiber optic spotlight, three intersecting beams of light form a crisp 6-rayed star centered perfectly on the dome.',
    treatmentsGuide: 'Diffusion-treated star sapphires (Linde process) show superficial stars confined to surface coating. Immersion testing and lack of natural rutile network identify synthetics.',
    valueFactors: {
      color: 'Desirable blue body color combined with sharpness and completeness of all 6 rays.',
      clarity: 'Translucent rather than opaque body; centered star reaching from girdle to apex.',
      cut: 'Symmetrical cabochon with dome height calibrated to center the star.',
      carat: 'Sri Lanka has produced the world’s most celebrated star sapphires up to 500+ carats.',
      originPremium: 'Ceylon star sapphires are world historical treasures.'
    },
    images: {
      faceted: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80',
      rough: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=1000&q=80',
      microscopic: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      spectrum: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80'
    },
    caratDefault: 12.8,
    certifiedBy: 'GCIA Certified (Ratnapura, Natural Unheated Star Sapphire)',
    priceEstimateTier: '$$$$',
    inStock: true,
    featured: false,
    badge: 'Limited'
  },
  {
    id: 'tanzanite-zoisite',
    name: 'Merelani Trichroic Tanzanite',
    tradeNames: ['Tanzanite', 'Blue Zoisite', 'Trichroic Gem of Merelani'],
    group: 'Zoisite',
    species: 'Zoisite',
    variety: 'Tanzanite',
    chemicalFormula: 'Ca₂Al₃(SiO₄)₃(OH) + V³⁺',
    crystalSystem: 'Orthorhombic',
    hardness: 6.5,
    specificGravity: 3.35,
    refractiveIndex: { min: 1.691, max: 1.700, spot: 1.695 },
    birefringence: 0.009,
    opticalCharacter: 'Biaxial positive (B+)',
    pleochroism: {
      type: 'Trichroic (Extremely Strong in rough, Dichroic post-heat)',
      colors: ['Deep Sapphire Blue', 'Royal Violet-Purple', 'Burgundy / Yellow-Brown (disappears upon heating)']
    },
    dispersion: 0.030,
    luster: 'Vitreous',
    cleavage: 'Perfect along {010}',
    fracture: 'Conchoidal to uneven',
    colorHue: 'Velvety Deep Royal Blue with Flashes of Violet',
    rarity: 'Rare',
    treatmentStatus: 'Heated',
    originSriLankan: false,
    sriLankaRegions: [],
    globalOrigins: ['Tanzania (Merelani Hills, Simanjiro District exclusive)'],
    diagnosticInclusions: [
      'Liquid healing fractures and actinolite needle crystals',
      'Diagnostic vanadium absorption bands',
      'Pronounced pleochroism visible through dichroscope'
    ],
    microscopicClues: 'Pleochroscope immediately isolates blue and violet axes; perfect cleavage requires cautious bench setting.',
    treatmentsGuide: 'Almost all commercial tanzanite is heated at 450-500°C to alter the brownish yellow c-axis to blue, creating pure violet-blue.',
    valueFactors: {
      color: 'Intense "vivid" or "exceptional" saturation of royal violet-blue; larger stones exhibit deeper saturation.',
      clarity: 'High eye-clean clarity expected in top tiers.',
      cut: 'Precision cushion and emerald cuts oriented to favor primary blue over violet.',
      carat: 'Single source geologically finite mine gives exceptional investment appeal.',
      originPremium: 'Single source worldwide in northern Tanzania.'
    },
    images: {
      faceted: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      rough: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=1000&q=80',
      microscopic: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      spectrum: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80'
    },
    caratDefault: 6.4,
    certifiedBy: 'GIA Certified (Natural Zoisite Tanzanite, Merelani)',
    priceEstimateTier: '$$$$',
    inStock: true,
    featured: false,
    badge: 'In Stock'
  },
  {
    id: 'ceylon-yellow-sapphire',
    name: 'Balangoda Pushparaga Yellow Sapphire',
    tradeNames: ['Pushparaga', 'Yellow Sapphire', 'Golden Ceylon Sapphire'],
    group: 'Corundum',
    species: 'Corundum',
    variety: 'Yellow Sapphire',
    chemicalFormula: 'Al₂O₃ + Fe³⁺ and color centers',
    crystalSystem: 'Trigonal',
    hardness: 9.0,
    specificGravity: 4.00,
    refractiveIndex: { min: 1.762, max: 1.770, spot: 1.766 },
    birefringence: 0.008,
    opticalCharacter: 'Uniaxial negative (U-)',
    pleochroism: {
      type: 'Dichroic (Weak to medium)',
      colors: ['Warm Canary Yellow', 'Light Straw Yellow']
    },
    dispersion: 0.018,
    luster: 'Vitreous',
    cleavage: 'None (Basal parting)',
    fracture: 'Conchoidal',
    colorHue: 'Radiant Golden Canary Yellow',
    rarity: 'Uncommon',
    treatmentStatus: 'Natural Unheated',
    originSriLankan: true,
    sriLankaRegions: ['Balangoda', 'Ratnapura', 'Pelmadulla'],
    globalOrigins: ['Sri Lanka (Ceylon)', 'Madagascar', 'Thailand', 'Australia'],
    diagnosticInclusions: [
      'Delicate intersecting silk needles and fingerprint inclusions',
      'Stable color center that does not fade upon sunlight exposure (unlike irradiated synthetics)',
      'Orange-red UV fluorescence under shortwave UV in natural stones'
    ],
    microscopicClues: 'Fade test under light exposure distinguishes stable iron-based natural yellow from unstable radiation-induced yellow color centers.',
    treatmentsGuide: 'Beryllium lattice diffusion is widely used in commercial markets to force orange-yellow colors into low-grade corundum; testing requires LA-ICP-MS.',
    valueFactors: {
      color: 'Vivid pure golden canary yellow without brownish or greenish secondary tints.',
      clarity: 'High transparency and excellent eye cleanliness.',
      cut: 'Brilliant pavilion oval or emerald cut maximizing scintillation.',
      carat: 'Highly coveted in Vedic astrology (Pushparaga for Jupiter) driving constant demand.',
      originPremium: 'Sri Lankan unheated Pushparaga carries Vedic and auction premiums.'
    },
    images: {
      faceted: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1000&q=80',
      rough: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=1000&q=80',
      microscopic: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      spectrum: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80'
    },
    caratDefault: 5.1,
    certifiedBy: 'GCIA Certified (Unheated Natural Pushparaga, Sri Lanka)',
    priceEstimateTier: '$$$$',
    inStock: true,
    featured: false,
    badge: 'In Stock'
  },
  {
    id: 'black-opal',
    name: 'Lightning Ridge Black Opal',
    tradeNames: ['Black Opal', 'Harlequin Opal', 'Queen of Gems'],
    group: 'Opal',
    species: 'Opal (Hydrated Silica)',
    variety: 'Black Opal (Sedimentary)',
    chemicalFormula: 'SiO₂ · nH₂O (sub-microscopic silica sphere lattice)',
    crystalSystem: 'Amorphous',
    hardness: 6.0,
    specificGravity: 2.15,
    refractiveIndex: { min: 1.450, max: 1.450, spot: 1.450 },
    birefringence: 0.000,
    opticalCharacter: 'Isotropic (Amorphous with strain birefringence)',
    pleochroism: {
      type: 'None (Amorphous)',
      colors: ['Full Spectrum Play-of-Color']
    },
    dispersion: 0.000,
    luster: 'Sub-vitreous to resinous',
    cleavage: 'None',
    fracture: 'Conchoidal',
    colorHue: 'N1 Dark Pitch-Black Potch Base with Neon Red-Orange-Green Play-of-Color',
    rarity: 'Museum Grade',
    treatmentStatus: 'Untreated',
    originSriLankan: false,
    sriLankaRegions: [],
    globalOrigins: ['Australia (Lightning Ridge, New South Wales)', 'Honduras', 'Ethiopia (Welo - Hydrophane)'],
    diagnosticInclusions: [
      'Natural sandstone or grey potch backing without artificial adhesive line',
      'Orderly diffraction patterns created by 150-300nm silica sphere arrays',
      'Absence of smoke or sugar-acid treatment carbon specks in cracks'
    ],
    microscopicClues: 'Cross-sectional loupe examination confirms single solid natural opal, ruling out doublets or triplets.',
    treatmentsGuide: 'Smoke treatment and sugar-acid immersion darken pale opals to simulate black opal; detectable by carbon residues in cellular cavities.',
    valueFactors: {
      color: 'Body tone N1 to N3; presence of elusive red play-of-color ("red on black") commands peak price.',
      clarity: 'Brilliance score B1 (extremely bright under diffuse lighting).',
      cut: 'Smooth rolling cabochon preserving the full face of color play.',
      carat: 'Solid gem-quality black opals over 5 carats are rare global treasures.',
      originPremium: 'Lightning Ridge is the undisputed premier provenance.'
    },
    images: {
      faceted: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      rough: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=1000&q=80',
      microscopic: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      spectrum: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80'
    },
    caratDefault: 4.8,
    certifiedBy: 'GIA Certified (Natural Solid Black Opal N1, Lightning Ridge)',
    priceEstimateTier: '$$$$$',
    inStock: true,
    featured: false,
    badge: 'Museum Piece'
  },
  {
    id: 'synthetic-verneuil-ruby',
    name: 'Synthetic Flame-Fusion Verneuil Corundum',
    tradeNames: ['Verneuil Synthetic Ruby', 'Flame Fusion Sapphire/Ruby', 'Lab-Created Corundum'],
    group: 'Synthetics & Simulants',
    species: 'Synthetic Corundum',
    variety: 'Lab Grown Ruby',
    chemicalFormula: 'Al₂O₃ (laboratory grown via Verneuil torch powder drop)',
    crystalSystem: 'Trigonal',
    hardness: 9.0,
    specificGravity: 4.00,
    refractiveIndex: { min: 1.762, max: 1.770, spot: 1.766 },
    birefringence: 0.008,
    opticalCharacter: 'Uniaxial negative (U-)',
    pleochroism: {
      type: 'Dichroic',
      colors: ['Deep Red', 'Orange-Red']
    },
    dispersion: 0.018,
    luster: 'Vitreous',
    cleavage: 'None',
    fracture: 'Conchoidal',
    colorHue: 'Overly Saturated Uniform Candy Red',
    rarity: 'Common',
    treatmentStatus: 'Synthetic',
    originSriLankan: false,
    sriLankaRegions: [],
    globalOrigins: ['Synthesized Industrially worldwide (France, Switzerland, USA)'],
    diagnosticInclusions: [
      'Curved growth striae (curved color banding across facets, never angular)',
      'Spherical and tadpole-shaped gas bubbles trapped during rapid crystallization',
      'Complete absence of natural mineral crystals, rutile silk, or boehmite needles'
    ],
    microscopicClues: 'Under immersion microscope with darkfield lighting, curved striae readily reveal Verneuil flame-fusion process, contrasting with sharp angular 120° zoning in natural gems.',
    treatmentsGuide: 'Diagnostic laboratory simulation: Synthetic corundum shares identical Mohs hardness (9.0) and RI (1.762-1.770) with natural stones. Gemological differentiation relies strictly on microscope inclusion diagnostics and fluorescence spectrometers.',
    valueFactors: {
      color: 'Uniform color with zero natural nuance.',
      clarity: 'Synthetically clean, lacking natural geological fingerprint.',
      cut: 'Commercial round or oval brilliant cuts.',
      carat: 'Minimal commercial value ($5-$30 per carat); invaluable as comparative reference in our research database.',
      originPremium: 'Zero natural origin value.'
    },
    images: {
      faceted: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1000&q=80',
      rough: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=1000&q=80',
      microscopic: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      spectrum: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80'
    },
    caratDefault: 5.0,
    certifiedBy: 'Gemological Research Reference Sample (Laboratory Synthetic)',
    priceEstimateTier: '$$$',
    inStock: true,
    featured: false,
    badge: 'Limited'
  }
];

export interface SriLankanMineRegion {
  id: string;
  name: string;
  sinhalaName: string;
  coordinates: { x: number; y: number }; // Relative percentage on SVG map
  primaryGems: string[];
  geologyType: string;
  traditionalMethods: string;
  historySummary: string;
  traceabilityStatus: string;
}

export const SRI_LANKA_MINING_REGIONS: SriLankanMineRegion[] = [
  {
    id: 'ratnapura',
    name: 'Ratnapura (City of Gems)',
    sinhalaName: 'රත්නපුර',
    coordinates: { x: 38, y: 68 },
    primaryGems: ['Blue Sapphire', 'Cat’s Eye Chrysoberyl', 'Star Sapphire', 'Yellow Sapphire', 'Zircon'],
    geologyType: 'Highland Metamorphic Complex alluvial gravels (Illam gravel beds buried under rice paddies)',
    traditionalMethods: 'Traditional pit mining (Pathal) with timber shoring, bamboo aeration, and woven rattan baskets (Kulla) for gravel washing.',
    historySummary: 'Referred to since King Solomon’s reign and Ptolemy’s charts. Ratnapura has yielded some of the greatest royal sapphires throughout European and Asian antiquity.',
    traceabilityStatus: '100% Traceable direct from licensed cooperative pit pits with GCIA export seals.'
  },
  {
    id: 'pelmadulla',
    name: 'Pelmadulla',
    sinhalaName: 'පැල්මඩුල්ල',
    coordinates: { x: 48, y: 72 },
    primaryGems: ['Pigeon Blood Ruby', 'Pink Sapphire', 'Padparadscha', 'Fine Blue Sapphire'],
    geologyType: 'Deep alluvial river basin layers (Illam) overlying Precambrian granulite facies',
    traditionalMethods: 'Deep shaft mining with dewatering pumps and artisanal gravity separation.',
    historySummary: 'Famous for producing dense, highly saturated corundum colors, especially the world-renowned Pelmadulla geuda crystals and pigeon blood rubies.',
    traceabilityStatus: 'Direct ethical partnership with certified family-operated mining syndicates.'
  },
  {
    id: 'balangoda',
    name: 'Balangoda',
    sinhalaName: 'බලන්ගොඩ',
    coordinates: { x: 55, y: 64 },
    primaryGems: ['Padparadscha Sapphire', 'Tourmaline', 'Zircon', 'Garnet', 'Spinel'],
    geologyType: 'Contact metamorphic skarns and pegmatitic weathering horizons in mountainous highland terrain',
    traditionalMethods: 'Hillside trenching, river panning, and artisanal pit mining preserving rainforest canopy.',
    historySummary: 'The historic holy grail locality for genuine lotus-hued Padparadscha sapphires balancing delicate pink and orange chromophores.',
    traceabilityStatus: 'Ethically sourced with local community reforestation escrow funds.'
  },
  {
    id: 'elahera',
    name: 'Elahera',
    sinhalaName: 'ඇලහැර',
    coordinates: { x: 58, y: 38 },
    primaryGems: ['Alexandrite Chrysoberyl', 'Cobalt Spinel', 'Fine Blue Sapphire', 'Tourmaline'],
    geologyType: 'Central Mahaweli alluvial deposits and calc-silicate skarns with high trace chromium and cobalt',
    traditionalMethods: 'Riverbank alluvial panning and shallow mechanized eco-pits with environmental rehabilitation guarantees.',
    historySummary: 'Discovered in modern gemological history during the 1960s Mahaweli irrigation projects, producing the world’s cleanest color-change alexandrites and cobalt spinels.',
    traceabilityStatus: 'Monitored by the National Gem and Jewellery Authority of Sri Lanka.'
  },
  {
    id: 'meetiyagoda',
    name: 'Meetiyagoda',
    sinhalaName: 'මීටියාගොඩ',
    coordinates: { x: 30, y: 84 },
    primaryGems: ['Blue Sheen Moonstone (Adularia)', 'Pegmatitic Quartz'],
    geologyType: 'Decomposed pegmatitic kaolinized feldspar veins nestled between Galle and Ambalangoda',
    traditionalMethods: 'Subterranean vertical shafts lined with coconut timber trusses reaching 10-30 meters down into soft white kaolin clay.',
    historySummary: 'The sole locality on earth that yields transparent moonstones with pure celestial electric blue adularescence floating on water-clear bodies.',
    traceabilityStatus: 'Preserved artisanal heritage site under strict sustainable extraction guidelines.'
  }
];

export interface GemQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'Scientific' | 'Origins' | 'Treatments' | 'Optics';
}

export const GEMOLOGY_QUIZ_QUESTIONS: GemQuizQuestion[] = [
  {
    id: 1,
    question: 'Which trace elements cause the delicate pinkish-orange lotus color in a true Sri Lankan Padparadscha sapphire?',
    options: [
      'Iron (Fe²⁺) and Titanium (Ti⁴⁺) alone',
      'Chromium (Cr³⁺) for pink and color-center / Iron (Fe³⁺) for orange',
      'Pure Copper (Cu²⁺) substitution',
      'Vanadium (V³⁺) with Beryllium diffusion'
    ],
    correctIndex: 1,
    explanation: 'Padparadscha sapphire owes its delicate color to a harmonious balance of chromium (Cr³⁺ yielding pink) and iron or stable color centers (yielding orange). If one color dominates over 55%, it is reclassified as either pink or orange sapphire.',
    category: 'Scientific'
  },
  {
    id: 2,
    question: 'How can a gemologist microscopically verify that a Ceylon Blue Sapphire is natural and unheated?',
    options: [
      'By checking if the stone scratches diamond',
      'By observing intact, unbroken rutile silk needles without melted discoidal tension fractures',
      'By verifying the absence of any inclusions whatsoever',
      'By placing it under water to see if it turns green'
    ],
    correctIndex: 1,
    explanation: 'High-temperature thermal enhancement (1600°C+) dissolves delicate rutile (TiO₂) needles into the corundum lattice, creating discoidal tension halos ("snowball effect"). Intact, needle-sharp silk conclusively proves the stone has never undergone high heat.',
    category: 'Treatments'
  },
  {
    id: 3,
    question: 'What is the characteristic optical phenomenon and mineral variety of Meetiyagoda, Sri Lanka?',
    options: [
      'Asterism in Ruby',
      'Adularescence (blue flash) in Orthoclase/Albite Moonstone',
      'Labradorescence in Plagioclase',
      'Aventurescence in Sunstone'
    ],
    correctIndex: 1,
    explanation: 'Meetiyagoda in southern Sri Lanka is the world’s most prestigious source of adularia moonstone, displaying celestial electric-blue adularescence caused by light scattering between alternating sub-microscopic orthoclase and albite lamellae.',
    category: 'Origins'
  },
  {
    id: 4,
    question: 'On the Mohs Hardness scale, which mineral occupies position 8.5 with an orthorhombic crystal structure?',
    options: [
      'Topaz',
      'Chrysoberyl (Alexandrite & Cat’s Eye)',
      'Spinel',
      'Corundum'
    ],
    correctIndex: 1,
    explanation: 'Chrysoberyl (BeAl₂O₄) has a Mohs hardness of 8.5, ranking directly below corundum (9) and diamond (10), making it exceptionally durable and resilient.',
    category: 'Scientific'
  },
  {
    id: 5,
    question: 'What is the local geological term for the gem-bearing alluvial gravel layer in Sri Lankan mining pits?',
    options: [
      'Illam',
      'Dona',
      'Pathal',
      'Kulla'
    ],
    correctIndex: 0,
    explanation: 'In Sri Lankan gemology, "Illam" refers to the ancient, buried alluvial gravel layer rich in rolled gem crystals. "Pathal" is the pit itself, "Dona" is a horizontal drift tunnel, and "Kulla" is the conical rattan basket used to wash the gravel.',
    category: 'Origins'
  }
];

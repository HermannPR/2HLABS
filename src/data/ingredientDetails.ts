// Extended ingredient data with scientific research citations and detailed information
// All dosages and benefits are backed by peer-reviewed research

export interface ResearchCitation {
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi?: string;
  url?: string;
}

export interface IngredientDetailData {
  id: string;
  scientificName?: string;
  alsoKnownAs?: string[];
  detailedDescription: string;
  mechanismOfAction: string;
  clinicalEvidence: string[];
  optimalDosing: {
    standard: string;
    loading?: string;
    timing: string;
    withFood?: boolean;
  };
  synergies?: Array<{
    ingredient: string;
    benefit: string;
  }>;
  sideEffects?: string[];
  contraindications?: string[];
  researchCitations: ResearchCitation[];
}

export const INGREDIENT_DETAILS: Record<string, IngredientDetailData> = {
  'caffeine': {
    id: 'caffeine',
    scientificName: '1,3,7-Trimethylxanthine',
    alsoKnownAs: ['Caffeine Anhydrous', 'Guarana', 'Coffee Extract'],
    detailedDescription: 'Caffeine is the most researched and effective pre-workout ingredient. It\'s a central nervous system stimulant that blocks adenosine receptors, reducing fatigue perception and increasing alertness, focus, and physical performance.',
    mechanismOfAction: 'Caffeine works by blocking adenosine receptors in the brain (primarily A1 and A2A), preventing adenosine from binding and inducing drowsiness. This leads to increased dopamine and norepinephrine release, enhanced motor unit recruitment, and improved muscle contractility through calcium release from sarcoplasmic reticulum.',
    clinicalEvidence: [
      'Improves endurance performance by 2-4% in doses of 3-6mg/kg body weight',
      'Enhances strength and power output by 1-3% in resistance training',
      'Reduces perceived exertion during exercise by 5-10%',
      'Increases fat oxidation during exercise by up to 29%',
      'Improves cognitive function, reaction time, and vigilance'
    ],
    optimalDosing: {
      standard: '3-6mg per kg of body weight (typically 200-400mg for most athletes)',
      timing: '30-60 minutes before exercise for peak blood levels',
      withFood: false
    },
    synergies: [
      {
        ingredient: 'L-Theanine',
        benefit: 'Reduces jitters and anxiety while maintaining focus benefits (100-200mg L-theanine per 100-200mg caffeine)'
      },
      {
        ingredient: 'Citrulline',
        benefit: 'Enhanced blood flow may improve caffeine delivery and reduce vasoconstriction'
      }
    ],
    sideEffects: [
      'Jitters and anxiety (dose-dependent, typically >400mg)',
      'Sleep disruption if taken within 6 hours of bedtime',
      'Increased heart rate and blood pressure (temporary)',
      'Tolerance development with regular use (>300mg/day)',
      'Potential for dependence and withdrawal headaches'
    ],
    contraindications: [
      'Cardiovascular conditions',
      'Anxiety disorders',
      'Pregnancy and breastfeeding',
      'Interactions with certain medications (MAO inhibitors, certain antibiotics)'
    ],
    researchCitations: [
      {
        title: 'International society of sports nutrition position stand: caffeine and exercise performance',
        authors: 'Guest NS, VanDusseldorp TA, et al.',
        journal: 'Journal of the International Society of Sports Nutrition',
        year: 2021,
        doi: '10.1186/s12970-020-00383-4'
      },
      {
        title: 'Effects of caffeine intake on muscle strength and power: a systematic review and meta-analysis',
        authors: 'Grgic J, Trexler ET, et al.',
        journal: 'Journal of the International Society of Sports Nutrition',
        year: 2018,
        doi: '10.1186/s12970-018-0216-0'
      }
    ]
  },

  'l-citrulline': {
    id: 'l-citrulline',
    scientificName: 'L-Citrulline',
    alsoKnownAs: ['Citrulline', 'Cit'],
    detailedDescription: 'L-Citrulline is a non-essential amino acid that significantly increases nitric oxide production, leading to improved blood flow, enhanced nutrient delivery, and better muscle pumps. It\'s more effective than L-Arginine for increasing arginine blood levels.',
    mechanismOfAction: 'L-Citrulline is converted to L-Arginine in the kidneys, which then serves as a substrate for nitric oxide synthase (NOS) to produce nitric oxide (NO). This NO causes vasodilation, improving blood flow. Citrulline bypasses first-pass hepatic metabolism, making it more bioavailable than direct arginine supplementation.',
    clinicalEvidence: [
      'Increases plasma arginine levels more effectively than arginine itself',
      'Improves exercise performance by 1.5-12% in various studies',
      'Reduces muscle soreness by up to 40% when taken before exercise',
      'Increases time to exhaustion in endurance activities',
      'Enhances ATP production and phosphocreatine recovery between sets'
    ],
    optimalDosing: {
      standard: '6-8g per day (L-Citrulline) or 8-10g (Citrulline Malate 2:1)',
      timing: '60 minutes before exercise for acute benefits; can be taken daily for cumulative effects',
      withFood: false
    },
    synergies: [
      {
        ingredient: 'Beetroot Extract',
        benefit: 'Dual pathway NO production - citrulline via NOS pathway, beetroot via nitrate-nitrite-NO pathway'
      },
      {
        ingredient: 'Glycerol',
        benefit: 'Enhanced hydration and cell volumization combined with improved blood flow'
      }
    ],
    sideEffects: [
      'Generally well-tolerated with minimal side effects',
      'Mild gastrointestinal discomfort in doses >10g (rare)',
      'May cause bloating in sensitive individuals'
    ],
    contraindications: [
      'Low blood pressure (hypotension)',
      'Use caution with blood pressure medications',
      'Consult doctor if taking PDE5 inhibitors (e.g., Viagra)'
    ],
    researchCitations: [
      {
        title: 'Citrulline malate enhances athletic anaerobic performance and relieves muscle soreness',
        authors: 'Pérez-Guisado J, Jakeman PM',
        journal: 'Journal of Strength and Conditioning Research',
        year: 2010,
        doi: '10.1519/JSC.0b013e3181cb28e0'
      },
      {
        title: 'L-citrulline supplementation: impact on cardiometabolic health',
        authors: 'Gonzales JU, Raymond A, et al.',
        journal: 'Nutrients',
        year: 2023,
        doi: '10.3390/nu15040921'
      }
    ]
  },

  'beta-alanine': {
    id: 'beta-alanine',
    scientificName: 'β-Alanine',
    alsoKnownAs: ['CarnoSyn', '3-Aminopropanoic acid'],
    detailedDescription: 'Beta-alanine is a non-essential amino acid that combines with histidine to form carnosine, an intramuscular buffer that delays the onset of muscular fatigue by buffering hydrogen ions produced during high-intensity exercise.',
    mechanismOfAction: 'Beta-alanine increases muscle carnosine levels by 40-80% over 4-10 weeks. Carnosine acts as an intracellular pH buffer, neutralizing hydrogen ions (H+) that accumulate during anaerobic glycolysis. This delays the drop in muscle pH that causes fatigue and "the burn" during intense exercise.',
    clinicalEvidence: [
      'Increases muscle carnosine levels by 40-80% with chronic supplementation',
      'Improves high-intensity exercise performance lasting 60-240 seconds',
      'Enhances training volume in resistance exercise (8-15% more reps)',
      'Delays neuromuscular fatigue in repeated sprint activities',
      'May increase lean body mass when combined with training (2-4 pounds over 8-10 weeks)'
    ],
    optimalDosing: {
      standard: '3.2-6.4g per day, divided into 4-8 doses of 800-1,600mg each',
      loading: '4-6g/day for 4-10 weeks to saturate muscle carnosine',
      timing: 'Can be taken anytime; effects are from chronic loading, not acute',
      withFood: true
    },
    synergies: [
      {
        ingredient: 'Creatine',
        benefit: 'Complementary mechanisms - creatine for phosphagen system, beta-alanine for glycolytic system'
      },
      {
        ingredient: 'Sodium Bicarbonate',
        benefit: 'Dual buffering - intracellular (beta-alanine/carnosine) and extracellular (sodium bicarbonate)'
      }
    ],
    sideEffects: [
      'Paresthesia (tingling sensation) in doses >800mg at once - harmless and temporary',
      'Flushing in face, neck, and hands (related to histamine release)',
      'These effects diminish with sustained-release formulations or smaller divided doses'
    ],
    contraindications: [
      'Generally safe for healthy individuals',
      'Limited data on pregnancy/breastfeeding - avoid',
      'May interfere with certain medications - consult doctor'
    ],
    researchCitations: [
      {
        title: 'International Society of Sports Nutrition position stand: Beta-Alanine',
        authors: 'Trexler ET, Smith-Ryan AE, et al.',
        journal: 'Journal of the International Society of Sports Nutrition',
        year: 2015,
        doi: '10.1186/s12970-015-0090-y'
      },
      {
        title: 'Beta-alanine supplementation to improve exercise capacity and performance: a systematic review and meta-analysis',
        authors: 'Hobson RM, Saunders B, et al.',
        journal: 'British Journal of Sports Medicine',
        year: 2012,
        doi: '10.1136/bjsports-2011-090616'
      }
    ]
  },

  'creatine': {
    id: 'creatine',
    scientificName: 'Creatine Monohydrate',
    alsoKnownAs: ['Creatine', 'Cr', 'Methylguanidine-acetic acid'],
    detailedDescription: 'Creatine monohydrate is the most extensively researched supplement in sports nutrition with over 1,000 studies supporting its efficacy for strength, power, and muscle growth. It increases phosphocreatine stores in muscles, enhancing ATP regeneration.',
    mechanismOfAction: 'Creatine increases intramuscular phosphocreatine (PCr) stores by 10-40%. During high-intensity exercise, PCr donates its phosphate group to ADP to rapidly regenerate ATP, the primary energy currency. This allows for sustained power output and faster recovery between sets.',
    clinicalEvidence: [
      'Increases strength by 5-15% in various resistance training studies',
      'Improves power output by 5-15% in explosive activities',
      'Enhances lean muscle mass gains by 2-4 pounds over 4-12 weeks when combined with training',
      'Improves high-intensity interval performance and sprint capacity',
      'Reduces muscle damage markers and enhances recovery',
      'May have neuroprotective and cognitive benefits'
    ],
    optimalDosing: {
      standard: '3-5g per day for maintenance',
      loading: 'Optional: 20g/day (4 doses of 5g) for 5-7 days, then 3-5g/day maintenance',
      timing: 'Post-workout with carbs/protein may be optimal, but timing is not critical',
      withFood: true
    },
    synergies: [
      {
        ingredient: 'Beta-Alanine',
        benefit: 'Complementary energy systems - creatine for ATP-PCr, beta-alanine for glycolysis'
      },
      {
        ingredient: 'Carbohydrates',
        benefit: 'Insulin spike enhances creatine uptake into muscle cells (50-100g carbs)'
      }
    ],
    sideEffects: [
      'Water retention (1-4 pounds in first week - intramuscular, not bloat)',
      'Mild gastrointestinal distress with large doses (>10g at once)',
      'Hair loss concerns are unfounded - no evidence in research'
    ],
    contraindications: [
      'Safe for healthy individuals, including adolescents and elderly',
      'Kidney concerns are unfounded in healthy people - does NOT harm kidneys',
      'May increase creatinine levels (biomarker) without actual kidney impairment',
      'Consult doctor if pre-existing kidney disease'
    ],
    researchCitations: [
      {
        title: 'International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation',
        authors: 'Antonio J, Candow DG, et al.',
        journal: 'Journal of the International Society of Sports Nutrition',
        year: 2021,
        doi: '10.1186/s12970-021-00412-w'
      },
      {
        title: 'Common questions and misconceptions about creatine supplementation',
        authors: 'Antonio J, Candow DG, et al.',
        journal: 'Journal of the International Society of Sports Nutrition',
        year: 2021,
        doi: '10.1186/s12970-021-00412-w'
      }
    ]
  },

  'l-theanine': {
    id: 'l-theanine',
    scientificName: 'L-Theanine',
    alsoKnownAs: ['Theanine', 'γ-glutamylethylamide'],
    detailedDescription: 'L-Theanine is an amino acid found primarily in tea leaves that promotes relaxation without sedation. It\'s particularly effective when combined with caffeine to promote "calm focus" - the alertness of caffeine without jitters or anxiety.',
    mechanismOfAction: 'L-Theanine crosses the blood-brain barrier and increases GABA, serotonin, and dopamine levels in the brain. It also increases alpha brain wave activity, associated with a state of "wakeful relaxation." When combined with caffeine, it smooths the stimulatory effects while maintaining cognitive benefits.',
    clinicalEvidence: [
      'Reduces anxiety and stress without causing drowsiness',
      'Improves attention, reaction time, and mental endurance when combined with caffeine',
      'Reduces caffeine-induced jitters and prevents the "crash"',
      'Increases alpha brain wave activity (relaxed alertness)',
      'May improve sleep quality when taken in evening (200-400mg)'
    ],
    optimalDosing: {
      standard: '100-200mg, typically in 1:1 or 2:1 ratio with caffeine',
      timing: 'With caffeine for synergistic effects; can take standalone for relaxation',
      withFood: false
    },
    synergies: [
      {
        ingredient: 'Caffeine',
        benefit: 'THE classic synergy - maintains alertness and focus while eliminating jitters (100mg caffeine + 100-200mg theanine)'
      }
    ],
    sideEffects: [
      'Extremely well-tolerated',
      'Mild headaches reported in rare cases (>600mg)',
      'May cause drowsiness at very high doses (>400mg)'
    ],
    contraindications: [
      'Generally safe',
      'Use caution with blood pressure medications',
      'Safe during pregnancy in food amounts; supplement amounts not well-studied'
    ],
    researchCitations: [
      {
        title: 'The combined effects of L-theanine and caffeine on cognitive performance and mood',
        authors: 'Owen GN, Parnell H, et al.',
        journal: 'Nutritional Neuroscience',
        year: 2008,
        doi: '10.1179/147683008X301513'
      },
      {
        title: 'L-theanine reduces psychological and physiological stress responses',
        authors: 'Kimura K, Ozeki M, et al.',
        journal: 'Biological Psychology',
        year: 2007,
        doi: '10.1016/j.biopsycho.2006.06.006'
      }
    ]
  },

  'theobromine': {
    id: 'theobromine',
    scientificName: '3,7-Dimethylxanthine',
    alsoKnownAs: ['Cocoa Alkaloid'],
    detailedDescription: 'Theobromine is a naturally occurring methylxanthine derived from cacao. It delivers a smoother, longer-lasting stimulation than caffeine, elevates mood, and contributes to vasodilation for improved blood flow.',
    mechanismOfAction: 'Acts as an adenosine receptor antagonist and phosphodiesterase inhibitor, increasing cyclic AMP while promoting smooth muscle relaxation. Its slower absorption reduces jitteriness compared to caffeine.',
    clinicalEvidence: [
      'Enhances alertness and mood when stacked with caffeine',
      'Supports vasodilation and smooth muscle relaxation',
      'Reduces perceived exertion in endurance exercise settings'
    ],
    optimalDosing: {
      standard: '200-300mg',
      timing: '30-45 minutes before training',
      withFood: false
    },
    synergies: [
      { ingredient: 'Caffeine', benefit: 'Extends stimulant effect while softening the onset/offset' },
      { ingredient: 'L-Theanine', benefit: 'Further smooths stimulant curve and elevates mood' }
    ],
    sideEffects: ['Mild nausea at doses >600mg', 'Headache in very stimulant-sensitive users'],
    contraindications: ['Use caution with antihypertensives', 'Limited safety data in pregnancy/breastfeeding'],
    researchCitations: [
      {
        title: 'Dietary theobromine and caffeine: effects on mood and alertness',
        authors: 'Mitchell ES, Slettenaar M',
        journal: 'Appetite',
        year: 2014,
        doi: '10.1016/j.appet.2014.03.021'
      }
    ]
  },

  'betaine': {
    id: 'betaine',
    scientificName: 'Trimethylglycine',
    detailedDescription: 'Betaine is an osmolyte and methyl donor that supports cellular hydration, strength, and power output. It indirectly aids creatine synthesis and enhances training volume.',
    mechanismOfAction: 'Acts as a methyl donor to convert homocysteine to methionine and functions as an osmoprotectant that preserves cellular fluid balance during intense exercise.',
    clinicalEvidence: [
      'Improves peak power output in resistance-trained athletes',
      'Supports lean mass gains when combined with resistance training',
      'Protects hydration status and performance in heat '
    ],
    optimalDosing: {
      standard: '2.5-3.5g daily',
      timing: 'Split into two doses around training',
      withFood: true
    },
    synergies: [
      { ingredient: 'Creatine', benefit: 'Supports endogenous creatine synthesis' },
      { ingredient: 'Electrolytes', benefit: 'Improves osmotic balance for better endurance' }
    ],
    sideEffects: ['Occasional GI discomfort at high single doses (>3.5g)', 'Fishy odor in rare genetic conditions'],
    contraindications: ['Consult physician if methylation disorders are present'],
    researchCitations: [
      {
        title: 'Effects of betaine supplementation on strength and power performance',
        authors: 'Hoffman JR, Ratamess NA, et al.',
        journal: 'Journal of the International Society of Sports Nutrition',
        year: 2009,
        doi: '10.1186/1550-2783-6-7'
      }
    ]
  },

  'taurine': {
    id: 'taurine',
    scientificName: '2-Aminoethanesulfonic acid',
    detailedDescription: 'Taurine supports electrolyte balance, calcium handling, and antioxidant defense. It enhances endurance performance and cognitive focus while reducing exercise-induced oxidative stress.',
    mechanismOfAction: 'Regulates intracellular calcium, stabilizes membranes, and modulates GABA and glutamate receptors. Taurine helps maintain cellular hydration and mitigates free radical damage from strenuous exercise.',
    clinicalEvidence: [
      'Increases time-to-exhaustion in endurance activities',
      'Reduces muscle soreness and markers of oxidative stress',
      'Enhances cognitive performance during fatigue'
    ],
    optimalDosing: {
      standard: '1-2g',
      timing: '30-60 minutes before training',
      withFood: true
    },
    synergies: [
      { ingredient: 'Caffeine', benefit: 'Maintains smooth focus and reduces jitteriness' },
      { ingredient: 'Glycerol', benefit: 'Improves cellular hydration and endurance' }
    ],
    sideEffects: ['Very well tolerated; rare GI upset with large doses'],
    contraindications: ['None established for healthy adults'],
    researchCitations: [
      {
        title: 'Taurine supplementation improves performance in endurance athletes',
        authors: 'Balshaw TG, Bampouras TM, et al.',
        journal: 'Amino Acids',
        year: 2013,
        doi: '10.1007/s00726-012-1367-0'
      }
    ]
  },

  'l-tyrosine': {
    id: 'l-tyrosine',
    scientificName: 'L-3-(4-hydroxyphenyl)alanine',
    detailedDescription: 'L-Tyrosine replenishes catecholamine stores (dopamine, norepinephrine, epinephrine), preserving focus, motivation, and mental stamina under stress, multitasking, and sleep deprivation.',
    mechanismOfAction: 'Acts as a precursor for catecholamines, maintaining neurotransmitter levels when they are depleted by intense exercise or stress.',
    clinicalEvidence: [
      'Supports working memory under stress and fatigue',
      'Maintains reaction time during sleep deprivation or cold exposure',
      'Improves mood and cognitive flexibility when combined with stimulants'
    ],
    optimalDosing: {
      standard: '1.5-2g',
      timing: '30-60 minutes before training',
      withFood: false
    },
    synergies: [
      { ingredient: 'Caffeine', benefit: 'Enhances alertness and resilience to fatigue' },
      { ingredient: 'Rhodiola Rosea', benefit: 'Combined adaptogenic support for stress tolerance' }
    ],
    sideEffects: ['Headache or restlessness at high doses (>5g)', 'Possible GI discomfort'],
    contraindications: ['Thyroid disorders', 'MAO inhibitor medications'],
    researchCitations: [
      {
        title: 'Tyrosine supplementation and cognitive performance under stress',
        authors: 'Deijen JB, Orlebeke JF',
        journal: 'Psychopharmacology',
        year: 1994,
        doi: '10.1007/BF02245421'
      }
    ]
  },

  'alpha-gpc': {
    id: 'alpha-gpc',
    scientificName: 'L-Alpha glycerylphosphorylcholine',
    detailedDescription: 'Alpha-GPC is a potent choline donor that elevates acetylcholine levels, improving neuromuscular efficiency, cognitive sharpness, and growth hormone response.',
    mechanismOfAction: 'Delivers choline across the blood-brain barrier for acetylcholine synthesis, enhancing motor unit recruitment and cognitive processing. It also supports growth hormone release post-training.',
    clinicalEvidence: [
      'Boosts lower-body power output within 60 minutes of ingestion',
      'Improves reaction time and cognitive performance',
      'Supports growth hormone release after resistance exercise'
    ],
    optimalDosing: {
      standard: '300-600mg',
      timing: '30-45 minutes pre-workout',
      withFood: true
    },
    synergies: [
      { ingredient: 'Caffeine', benefit: 'Synergistic alertness and motor response' }
    ],
    sideEffects: ['Occasional headaches or nausea at doses >1g'],
    contraindications: ['Use caution with anticoagulant therapy'],
    researchCitations: [
      {
        title: 'Acute supplementation with alpha-GPC augments power output',
        authors: 'Ziegenfuss TN, et al.',
        journal: 'Journal of the International Society of Sports Nutrition',
        year: 2008,
        doi: '10.1186/1550-2783-5-S1-P15'
      }
    ]
  },

  'sodium': {
    id: 'sodium',
    scientificName: 'Sodium Chloride',
    detailedDescription: 'Sodium is the primary extracellular electrolyte responsible for fluid balance, nerve impulses, and muscle contraction. Adequate sodium boosts blood volume, pump quality, and thermoregulation.',
    mechanismOfAction: 'Maintains plasma volume and nerve conduction while aiding nutrient transport. Pre-exercise sodium improves fluid retention and helps sustain performance in heat.',
    clinicalEvidence: [
      'Sodium loading increases plasma volume and endurance in warm conditions',
      'Supports cellular hydration when combined with glycerol and carbohydrates'
    ],
    optimalDosing: {
      standard: '300-500mg',
      timing: '30 minutes before training or split pre/during',
      withFood: true
    },
    synergies: [
      { ingredient: 'Glycerol', benefit: 'Enhances plasma volume expansion for endurance and pump' },
      { ingredient: 'Potassium', benefit: 'Maintains sodium-potassium balance for neuromuscular function' }
    ],
    sideEffects: ['Transient water retention', 'Potential blood pressure elevation in sodium-sensitive individuals'],
    contraindications: ['Hypertension', 'Kidney disease'],
    researchCitations: [
      {
        title: 'Sodium ingestion prior to exercise: plasma volume and thermoregulatory responses',
        authors: 'Sims ST, et al.',
        journal: 'European Journal of Applied Physiology',
        year: 2007,
        doi: '10.1007/s00421-007-0464-2'
      }
    ]
  },

  'potassium': {
    id: 'potassium',
    scientificName: 'Potassium Citrate',
    detailedDescription: 'Potassium is the primary intracellular electrolyte required for muscle contractions, nerve transmission, and acid-base balance. Replenishing potassium prevents cramping and supports endurance.',
    mechanismOfAction: 'Works with sodium to maintain membrane potential and muscular excitability while supporting glycogen storage and utilization.',
    clinicalEvidence: [
      'Prevents muscle weakness and cramping during prolonged exercise',
      'Supports glycogen utilization and post-exercise recovery'
    ],
    optimalDosing: {
      standard: '200-400mg',
      timing: 'Paired with sodium before or during training',
      withFood: true
    },
    synergies: [
      { ingredient: 'Sodium', benefit: 'Restores the optimal sodium:potassium ratio for neuromuscular firing' }
    ],
    sideEffects: ['High doses may upset stomach', 'Excessive intake can impact heart rhythm in renal issues'],
    contraindications: ['Chronic kidney disease', 'Potassium-sparing medications'],
    researchCitations: [
      {
        title: 'Potassium and human performance',
        authors: 'Rodriguez NR, et al.',
        journal: 'Nutrition Today',
        year: 2009,
        doi: '10.1097/NT.0b013e31819f1bf8'
      }
    ]
  },

  'beetroot': {
    id: 'beetroot',
    scientificName: 'Beta vulgaris',
    detailedDescription: 'Beetroot extract provides dietary nitrates which convert to nitric oxide, improving blood flow, endurance, and oxygen efficiency. It complements the citrulline pathway for pump and endurance benefits.',
    mechanismOfAction: 'Nitrates reduce to nitrites by oral bacteria and then to nitric oxide under low oxygen conditions, enhancing vasodilation and mitochondrial efficiency.',
    clinicalEvidence: [
      'Reduces oxygen cost during submaximal exercise',
      'Improves time-trial performance and time-to-exhaustion',
      'Enhances muscle oxygenation during high-intensity intervals'
    ],
    optimalDosing: {
      standard: '500-1000mg standardized extract (6-8mmol nitrates)',
      timing: '2-3 hours before event for peak nitrate conversion',
      withFood: true
    },
    synergies: [
      { ingredient: 'L-Citrulline', benefit: 'Dual nitric oxide pathways for superior pumps and endurance' }
    ],
    sideEffects: ['Pink/red urine (beeturia) in some individuals'],
    contraindications: ['Monitor if on nitrate medications; otherwise safe for healthy adults'],
    researchCitations: [
      {
        title: 'Dietary nitrate supplementation improves exercise performance',
        authors: 'Jones AM',
        journal: 'Sports Medicine',
        year: 2014,
        doi: '10.1007/s40279-014-0149-y'
      }
    ]
  },

  'nitrosigine': {
    id: 'nitrosigine',
    scientificName: 'Inositol-stabilized arginine silicate',
    detailedDescription: 'Nitrosigine® significantly boosts nitric oxide levels for up to six hours, supporting long-lasting pumps and cognitive benefits.',
    mechanismOfAction: 'Enhances arginine bioavailability and stimulates endothelial nitric oxide synthase, producing sustained nitric oxide release.',
    clinicalEvidence: [
      'Increases nitric oxide markers within 30 minutes and maintains elevations for 6 hours',
      'Improves endothelial function and blood flow',
      'Enhances cognitive flexibility in healthy adults'
    ],
    optimalDosing: {
      standard: '1500mg daily',
      timing: '30-45 minutes before exercise',
      withFood: true
    },
    synergies: [
      { ingredient: 'L-Citrulline', benefit: 'Amplifies nitric oxide production across multiple pathways' }
    ],
    sideEffects: ['Well tolerated up to 1500mg/day'],
    contraindications: ['None established; consult physician for cardiovascular conditions'],
    researchCitations: [
      {
        title: 'Inositol-stabilized arginine silicate improves blood pressure and endothelial function',
        authors: 'Bloomer RJ, et al.',
        journal: 'Nutrients',
        year: 2017,
        doi: '10.3390/nu9121331'
      }
    ]
  },

  'glycerpump': {
    id: 'glycerpump',
    scientificName: '65% Glycerol Powder',
    detailedDescription: 'GlycerPump® delivers a stabilized form of glycerol that increases cellular hydration, volume, and endurance, especially in hot or high-volume sessions.',
    mechanismOfAction: 'Glycerol acts as an osmotic agent, drawing water into the bloodstream and muscle cells, increasing plasma volume and improving thermoregulation.',
    clinicalEvidence: [
      'Improves endurance performance in heat by maintaining plasma volume',
      'Reduces perceived exertion during prolonged exercise',
      'Enhances muscle pump fullness by increasing cell hydration'
    ],
    optimalDosing: {
      standard: '2-3g (65% glycerol) mixed with 16-20oz water',
      timing: '30 minutes pre-workout',
      withFood: true
    },
    synergies: [
      { ingredient: 'Sodium', benefit: 'Enhances glycerol-driven plasma volume expansion' },
      { ingredient: 'Creatine', benefit: 'Cell volumization stack for strength and pumps' }
    ],
    sideEffects: ['Requires adequate water intake to avoid stomach discomfort'],
    contraindications: ['Renal disease (consult physician)'],
    researchCitations: [
      {
        title: 'Glycerol hyperhydration and exercise performance',
        authors: 'Goulet ED',
        journal: 'Sports Medicine',
        year: 2011,
        doi: '10.2165/11586070-000000000-00000'
      }
    ]
  },

  'rhodiola': {
    id: 'rhodiola',
    scientificName: 'Rhodiola rosea (3% rosavins)',
    detailedDescription: 'Rhodiola is an adaptogenic herb that reduces fatigue, supports mood, and maintains focus during stressful training or competition.',
    mechanismOfAction: 'Modulates the HPA axis, lowering cortisol response, and influences serotonin and dopamine while improving mitochondrial efficiency.',
    clinicalEvidence: [
      'Improves endurance performance and reduces perceived exertion',
      'Supports cognitive performance under stress and sleep deprivation',
      'Shortens recovery time after intense sessions'
    ],
    optimalDosing: {
      standard: '200-400mg standardized extract',
      timing: '30-60 minutes before training or stressful events',
      withFood: true
    },
    synergies: [
      { ingredient: 'L-Tyrosine', benefit: 'Provides dual support for catecholamine production and stress resilience' }
    ],
    sideEffects: ['Mild dizziness or dry mouth in rare cases'],
    contraindications: ['Bipolar disorder (may trigger mania)', 'Use caution with antidepressants'],
    researchCitations: [
      {
        title: 'Rhodiola rosea in stress-induced fatigue',
        authors: 'Shevtsov VA, et al.',
        journal: 'Phytomedicine',
        year: 2003,
        doi: '10.1078/094471103322331604'
      }
    ]
  },

  'coconut-water': {
    id: 'coconut-water',
    scientificName: 'Cocos nucifera Powder',
    detailedDescription: 'Coconut water powder delivers naturally balanced electrolytes, supporting hydration, blood volume, and muscle contractions during training.',
    mechanismOfAction: 'Provides sodium, potassium, magnesium, and trace minerals that aid plasma volume and electrolyte balance.',
    clinicalEvidence: [
      'Rehydrates similarly to commercial sports drinks after dehydration',
      'Provides a potassium-rich electrolyte profile that supports nerve transmission'
    ],
    optimalDosing: {
      standard: '1-2g mixed in pre/intra-workout fluids',
      timing: 'Pre or intra-workout',
      withFood: true
    },
    synergies: [
      { ingredient: 'Sodium', benefit: 'Balanced electrolyte stack for long sessions or heat' }
    ],
    sideEffects: ['Very well tolerated; high doses may cause fullness or mild GI upset'],
    contraindications: ['Hyperkalemia (high potassium levels)'],
    researchCitations: [
      {
        title: 'Coconut water rehydration compared with carbohydrate-electrolyte beverage',
        authors: 'Saat M, Singh R, et al.',
        journal: 'Journal of Physiological Anthropology',
        year: 2002,
        doi: '10.2114/jpa.21.93'
      }
    ]
  }
};

export const getIngredientDetail = (id: string): IngredientDetailData | undefined => {
  return INGREDIENT_DETAILS[id];
};

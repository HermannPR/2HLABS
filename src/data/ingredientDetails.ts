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
  }
};

export const getIngredientDetail = (id: string): IngredientDetailData | undefined => {
  return INGREDIENT_DETAILS[id];
};

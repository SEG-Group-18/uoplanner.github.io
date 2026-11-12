export type Locale = "en" | "fr";

type Messages = {
  brand: string;
  home: string;
  product: string;
  pricing: string;
  team: string;
  languageLabel: string;
  themeLabel: string;
  themeAction: string;
  headerCta: string;
  assistantTitle: string;
  assistantIntro: string;
  assistantDisclosure: string;
  assistantPrompt: string;
  assistantClose: string;
  assistantQuestions: { question: string; answer: string }[];
  welcomeEyebrow: string;
  welcomeTitle: string;
  welcomeText: string;
  welcomeAction: string;
  welcomeNote: string;
  heroKicker: string;
  heroTitle: string;
  heroText: string;
  heroPrimary: string;
  heroSecondary: string;
  introKicker: string;
  introTitle: string;
  introText: string;
  stepOneTitle: string;
  stepOneText: string;
  stepTwoTitle: string;
  stepTwoText: string;
  stepThreeTitle: string;
  stepThreeText: string;
  benefitsKicker: string;
  benefitsTitle: string;
  benefitsText: string;
  benefitOneTitle: string;
  benefitOneText: string;
  benefitTwoTitle: string;
  benefitTwoText: string;
  benefitThreeTitle: string;
  benefitThreeText: string;
  premiumTeaserTitle: string;
  premiumTeaserText: string;
  scheduleKicker: string;
  scheduleTitle: string;
  scheduleDescription: string;
  scheduleBadge: string;
  scheduleNote: string;
  scheduleBlocksNote: string;
  timeLabel: string;
  weekdays: string[];
  productKicker: string;
  productTitle: string;
  productText: string;
  productFeatureAction: string;
  productDialogClose: string;
  productFeatures: { title: string; detail: string }[];
  productDisclaimer: string;
  pricingKicker: string;
  pricingTitle: string;
  pricingText: string;
  freeName: string;
  freeDescription: string;
  freeFeatures: string[];
  freeAction: string;
  premiumName: string;
  premiumDescription: string;
  premiumFeatures: string[];
  premiumAction: string;
  perMonth: string;
  planned: string;
  faqKicker: string;
  faqTitle: string;
  faqQuestions: { question: string; answer: string }[];
  startPlanning: string;
  teamKicker: string;
  teamTitle: string;
  teamText: string;
  teamMissionKicker: string;
  teamMissionTitle: string;
  teamMissionText: string;
  teamRole: string;
  teamProgram: string;
  teamProgramLabel: string;
  teamContributionLabel: string;
  teamExpandAction: string;
  teamCollapseAction: string;
  teamChallenges: { title: string; text: string }[];
  footerText: string;
};

export const messages: Record<Locale, Messages> = {
  en: {
    brand: "UOPlanner",
    home: "Home",
    product: "Product",
    pricing: "Pricing",
    team: "Team",
    languageLabel: "Switch language to French",
    themeLabel: "Color theme",
    themeAction: "Switch to dark mode",
    headerCta: "Plan your week",
    assistantTitle: "UOPlanner AI",
    assistantIntro: "Quick answers for your course planning",
    assistantDisclosure: "Choose from five ready-made answers. No live AI service is connected.",
    assistantPrompt: "Pick a question to get started.",
    assistantClose: "Close assistant",
    assistantQuestions: [
      {
        question: "What is UOPlanner?",
        answer: "UOPlanner helps uOttawa students compare course combinations and see how a week could fit together. The schedule on this site is a sample preview.",
      },
      {
        question: "How do I read the sample schedule?",
        answer: "Use the weekday columns and time labels to follow each planned session. The empty blocks are placeholders and don’t identify specific courses or programs.",
      },
      {
        question: "Can I register here?",
        answer: "No. UOPlanner is a planning aid. Confirm current course availability and complete official registration in your uoZone account.",
      },
      {
        question: "Is UOPlanner free?",
        answer: "The core planner is intended to be free. Premium is a proposed $10-per-month option, and checkout is not available yet.",
      },
      {
        question: "What if a course time or room changes?",
        answer: "The sample schedule may not reflect current offerings. Check the latest section details in uoZone before making registration decisions.",
      },
    ],
    welcomeEyebrow: "Meet your new course-planning sidekick",
    welcomeTitle: "Ever struggled to fit all your courses into your schedule?",
    welcomeText:
      "Lectures, labs, tutorials, and everything in between can be a lot to juggle. We’re here to help you find a week that fits.",
    welcomeAction: "Show me a better week",
    welcomeNote: "A clearer plan is just one click away.",
    heroKicker: "COURSE PLANNING, MADE CLEARER",
    heroTitle: "Plan your Ottawa semester with less stress",
    heroText:
      "Compare valid course combinations, avoid timetable conflicts, and find a week that works for your life at uOttawa.",
    heroPrimary: "See your sample week",
    heroSecondary: "How it works",
    introKicker: "A calmer way to plan",
    introTitle: "From course list to a week that works.",
    introText:
      "Registration can mean jumping between uoZone listings and trying to fit lectures, labs, and discussion groups together by hand. UOPlanner checks the combinations for schedule conflicts and lays out valid options so you can spend less time piecing together your week.",
    stepOneTitle: "Choose your courses",
    stepOneText:
      "Start with your program, year of study, and the courses you plan to take.",
    stepTwoTitle: "Review valid schedules",
    stepTwoText:
      "Compare combinations of lectures, labs, and discussion groups without timetable overlaps.",
    stepThreeTitle: "Take your plan to uoZone",
    stepThreeText:
      "Choose a schedule that suits you, then confirm availability and complete registration in uoZone.",
    benefitsKicker: "Built around student life",
    benefitsTitle: "More than a calendar",
    benefitsText:
      "Balance classes with work, family, campus activities, and the time you need to study or recharge.",
    benefitOneTitle: "Skip impossible combinations",
    benefitOneText:
      "See schedule options without overlapping lectures, labs, or discussion groups.",
    benefitTwoTitle: "Make room for your week",
    benefitTwoText:
      "Use planning preferences to keep a day free, reduce long gaps, or prioritize morning classes.",
    benefitThreeTitle: "Stay in control",
    benefitThreeText:
      "Compare your options here, then confirm course availability and register through uoZone.",
    premiumTeaserTitle: "Want more ways to fine-tune your schedule?",
    premiumTeaserText:
      "Explore the planned Premium tier for advanced planning preferences at $10 per month.",
    scheduleKicker: "A week that fits any program",
    scheduleTitle: "Your week, without the scheduling scramble.",
    scheduleDescription:
      "A course-free weekly grid that shows how schedules can take shape across science, engineering, arts, and every other program.",
    scheduleBadge: "MON–FRI · ILLUSTRATION",
    scheduleNote:
      "Illustration only. Your actual courses and available times depend on your program and current course listings.",
    scheduleBlocksNote:
      "Empty blocks stand in for course sessions; no specific subjects or majors are shown.",
    timeLabel: "TIME",
    weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    productKicker: "Your planning toolkit",
    productTitle: "Build a week that fits your life.",
    productText:
      "UOPlanner brings the pieces of course planning together so you can compare a clear set of schedule options before registering.",
    productFeatureAction: "Learn more",
    productDialogClose: "Close",
    productFeatures: [
      {
        title: "Choose courses for your program and year of study.",
        detail:
          "Start with the classes that count toward your studies, so you can focus on the sections that matter for your upcoming term.",
      },
      {
        title: "Compare combinations of lectures, labs, and discussion groups while avoiding timetable conflicts.",
        detail:
          "See required class components together instead of piecing together separate listings and discovering overlaps later.",
      },
      {
        title: "Review the week visually to spot long gaps and days that stay open.",
        detail:
          "A weekly view makes it easier to notice back-to-back classes, open afternoons, and long breaks between campus visits.",
      },
      {
        title: "Use preferences to explore free days, more compact schedules, or morning-focused options.",
        detail:
          "Try different priorities to find a schedule that leaves room for work, studying, campus activities, or time to recharge.",
      },
      {
        title: "Review section details and take your selected codes to uoZone.",
        detail:
          "Use your preferred sections as a planning reference, then confirm current availability and complete registration in uoZone.",
      },
    ],
    productDisclaimer:
      "UOPlanner is a planning aid, not the university registration system. Course availability can change; confirm details and register through uoZone.",
    pricingKicker: "Simple, student-friendly pricing",
    pricingTitle: "Free essentials. Premium options.",
    pricingText:
      "Start with the core schedule planner at no cost. The planned Premium tier adds more ways to prioritize the week you want.",
    freeName: "Free",
    freeDescription: "The essentials for building and comparing course schedules.",
    freeFeatures: [
      "Generate and compare course combinations",
      "Avoid conflicts between class meetings",
      "View a clear weekly timetable",
    ],
    freeAction: "Start planning",
    premiumName: "Premium",
    premiumDescription:
      "Advanced preferences to help your schedule fit the rest of your life.",
    premiumFeatures: [
      "Block days you want to keep free",
      "Prioritize compact schedules with shorter gaps",
      "Prioritize morning classes or your preferred routine",
    ],
    premiumAction: "Premium is coming soon",
    perMonth: "/ month",
    planned: "Planned",
    faqKicker: "Good to know",
    faqTitle: "Questions, answered.",
    faqQuestions: [
      {
        question: "Does UOPlanner register me for courses?",
        answer:
          "No. UOPlanner helps you compare schedules. Confirm current course availability and complete official registration through your uoZone account.",
      },
      {
        question: "What does Premium include?",
        answer:
          "The planned $10-per-month tier adds preferences such as keeping selected days free, prioritizing compact schedules, and preferring morning classes.",
      },
      {
        question: "Can I subscribe to Premium now?",
        answer:
          "Not yet. Premium is a proposed plan; subscription checkout is not available at this time.",
      },
    ],
    startPlanning: "Explore the sample week",
    teamKicker: "Our mission",
    teamTitle: "Built by students, for students.",
    teamText:
      "We are software engineering and computer science students at the University of Ottawa, bringing our own course-planning frustrations into a shared project.",
    teamMissionKicker: "What we learned by trying to plan",
    teamMissionTitle: "Small scheduling snags add up.",
    teamMissionText:
      "As a team, we ran into the familiar friction of comparing scattered course listings, checking that lectures and labs fit together, and weighing a conflict-free timetable against long gaps or inconvenient days. Those shared challenges shaped our goal: make schedule options easier to see and compare, while leaving official availability and registration in uoZone.",
    teamRole: "UOPlanner co-creator",
    teamProgram: "Software Engineering or Computer Science · University of Ottawa",
    teamProgramLabel: "Program",
    teamContributionLabel: "Contribution",
    teamExpandAction: "Reveal contribution",
    teamCollapseAction: "Return to portrait",
    teamChallenges: [
      {
        title: "Finding the right sections",
        text:
          "While testing the planning flow, our team saw how much time it takes to gather lecture, lab, and discussion details from separate listings.",
      },
      {
        title: "Catching timetable conflicts",
        text:
          "Trying combinations by hand made it easy to miss an overlap. That common frustration pushed us toward clearer, side-by-side options.",
      },
      {
        title: "Making room for labs",
        text:
          "A lecture time alone does not tell the whole story. Labs and tutorials add another layer that students need to compare together.",
      },
      {
        title: "Avoiding long gaps",
        text:
          "We learned that a technically valid schedule can still leave awkward breaks in the middle of the day.",
      },
      {
        title: "Knowing what to verify",
        text:
          "A planning view cannot reserve a seat. We keep the handoff to uoZone visible so students know where to confirm and register.",
      },
    ],
    footerText: "A clearer week starts with a better plan.",
  },
  fr: {
    brand: "UOPlanner",
    home: "Accueil",
    product: "Produit",
    pricing: "Tarifs",
    team: "Équipe",
    languageLabel: "Passer la langue en anglais",
    themeLabel: "Thème de couleurs",
    themeAction: "Passer au mode sombre",
    headerCta: "Planifier ma semaine",
    assistantTitle: "IA UOPlanner",
    assistantIntro: "Des réponses rapides pour planifier vos cours",
    assistantDisclosure: "Choisissez parmi cinq réponses prédéfinies. Aucun service d’IA en direct n’est connecté.",
    assistantPrompt: "Choisissez une question pour commencer.",
    assistantClose: "Fermer l’assistant",
    assistantQuestions: [
      {
        question: "Qu’est-ce que UOPlanner?",
        answer: "UOPlanner aide les étudiants de l’Université d’Ottawa à comparer des combinaisons de cours et à visualiser leur semaine. L’horaire du site est un exemple.",
      },
      {
        question: "Comment lire l’horaire exemple?",
        answer: "Utilisez les colonnes des jours et les heures pour repérer les séances. Les cases vides sont des repères visuels et ne représentent aucun cours ni programme en particulier.",
      },
      {
        question: "Puis-je m’inscrire ici?",
        answer: "Non. UOPlanner est un outil de planification. Vérifiez les places disponibles et effectuez l’inscription officielle dans votre compte uoZone.",
      },
      {
        question: "UOPlanner est-il gratuit?",
        answer: "Le planificateur de base est conçu pour être gratuit. Le forfait Premium à 10 $ par mois est proposé, mais le paiement n’est pas encore disponible.",
      },
      {
        question: "Et si l’heure ou la salle change?",
        answer: "L’horaire exemple ne reflète pas nécessairement l’offre actuelle. Vérifiez les détails des groupes dans uoZone avant de vous inscrire.",
      },
    ],
    welcomeEyebrow: "Votre nouvel allié pour planifier vos cours",
    welcomeTitle: "Vous avez déjà eu du mal à faire entrer tous vos cours dans votre horaire?",
    welcomeText:
      "Cours magistraux, laboratoires, tutoriels et tout le reste : il y a beaucoup à coordonner. Nous sommes là pour vous aider à trouver une semaine qui vous convient.",
    welcomeAction: "Découvrez un horaire plus simple",
    welcomeNote: "Un horaire plus clair, à un clic.",
    heroKicker: "PLANIFIER SES COURS, PLUS SIMPLEMENT",
    heroTitle: "Planifiez votre session à Ottawa sans stress",
    heroText:
      "Comparez des combinaisons de cours valides, évitez les conflits d’horaire et trouvez une semaine qui convient à votre vie à l’Université d’Ottawa.",
    heroPrimary: "Voir un exemple d’horaire",
    heroSecondary: "Comment ça marche",
    introKicker: "Planifier plus sereinement",
    introTitle: "Des cours choisis à une semaine qui vous convient.",
    introText:
      "L’inscription oblige souvent à passer d’une fiche uoZone à l’autre et à assembler manuellement les cours magistraux, les laboratoires et les groupes de discussion. UOPlanner vérifie les combinaisons pour repérer les conflits et présente les options valides afin de vous aider à organiser votre semaine.",
    stepOneTitle: "Choisissez vos cours",
    stepOneText:
      "Commencez par votre programme, votre année d’études et les cours que vous souhaitez suivre.",
    stepTwoTitle: "Comparez des horaires valides",
    stepTwoText:
      "Comparez les cours magistraux, les laboratoires et les groupes de discussion sans chevauchement.",
    stepThreeTitle: "Passez à uoZone",
    stepThreeText:
      "Choisissez un horaire qui vous convient, puis confirmez les places et terminez l’inscription dans uoZone.",
    benefitsKicker: "Pensé pour la vie étudiante",
    benefitsTitle: "Bien plus qu’un calendrier",
    benefitsText:
      "Conciliez les cours avec le travail, la famille, les activités sur le campus et le temps nécessaire pour étudier ou souffler.",
    benefitOneTitle: "Évitez les combinaisons impossibles",
    benefitOneText:
      "Consultez des horaires sans chevauchement entre cours magistraux, laboratoires et groupes de discussion.",
    benefitTwoTitle: "Faites de la place dans votre semaine",
    benefitTwoText:
      "Utilisez les préférences pour garder une journée libre, réduire les longues pauses ou privilégier les cours du matin.",
    benefitThreeTitle: "Gardez le contrôle",
    benefitThreeText:
      "Comparez vos options ici, puis confirmez les places et inscrivez-vous dans uoZone.",
    premiumTeaserTitle: "Envie d’affiner davantage votre horaire?",
    premiumTeaserText:
      "Découvrez le forfait Premium prévu à 10 $ par mois et ses préférences avancées.",
    scheduleKicker: "Un horaire adapté à chaque programme",
    scheduleTitle: "Votre semaine, sans casse-tête d’horaire.",
    scheduleDescription:
      "Une grille hebdomadaire sans cours précis, qui illustre la planification en sciences, en génie, en arts et dans tous les autres programmes.",
    scheduleBadge: "LUN–VEN · ILLUSTRATION",
    scheduleNote:
      "Illustration seulement. Vos cours et les heures offertes dépendent de votre programme et des horaires publiés.",
    scheduleBlocksNote:
      "Les cases vides représentent des séances de cours, sans matière ni programme particulier.",
    timeLabel: "HEURE",
    weekdays: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
    productKicker: "Vos outils de planification",
    productTitle: "Une semaine qui convient à votre quotidien.",
    productText:
      "UOPlanner rassemble les éléments de la planification de cours pour vous permettre de comparer clairement plusieurs horaires avant l’inscription.",
    productFeatureAction: "En savoir plus",
    productDialogClose: "Fermer",
    productFeatures: [
      {
        title: "Choisissez les cours de votre programme et de votre année d’études.",
        detail:
          "Commencez par les cours qui comptent dans votre parcours afin de vous concentrer sur les groupes pertinents pour le trimestre.",
      },
      {
        title: "Comparez les cours magistraux, les laboratoires et les groupes de discussion sans conflit d’horaire.",
        detail:
          "Consultez ensemble les composantes obligatoires au lieu de rassembler des fiches séparées et de découvrir les conflits plus tard.",
      },
      {
        title: "Visualisez la semaine pour repérer les longues pauses et les journées libres.",
        detail:
          "La vue hebdomadaire aide à repérer les cours consécutifs, les après-midis libres et les longues pauses entre deux séances.",
      },
      {
        title: "Explorez des préférences pour garder des journées libres, regrouper les cours ou privilégier les matinées.",
        detail:
          "Essayez différentes priorités pour concilier les cours avec le travail, les révisions, les activités sur le campus ou le repos.",
      },
      {
        title: "Consultez les détails des groupes et apportez vos codes à uoZone.",
        detail:
          "Utilisez les groupes choisis comme référence, puis vérifiez les places disponibles et terminez l’inscription dans uoZone.",
      },
    ],
    productDisclaimer:
      "UOPlanner est un outil de planification, pas le système d’inscription de l’Université. Les places peuvent changer; vérifiez les détails et inscrivez-vous dans uoZone.",
    pricingKicker: "Des tarifs simples pour les étudiants",
    pricingTitle: "L’essentiel gratuit. Plus d’options avec Premium.",
    pricingText:
      "Commencez gratuitement avec les fonctions essentielles. Le forfait Premium prévu offrira plus de façons de prioriser votre semaine.",
    freeName: "Gratuit",
    freeDescription:
      "Les fonctions essentielles pour créer et comparer des horaires de cours.",
    freeFeatures: [
      "Générez et comparez des combinaisons de cours",
      "Évitez les conflits entre les séances de cours",
      "Consultez un horaire hebdomadaire clair",
    ],
    freeAction: "Commencer à planifier",
    premiumName: "Premium",
    premiumDescription:
      "Des préférences avancées pour adapter votre horaire au reste de votre quotidien.",
    premiumFeatures: [
      "Bloquez les journées que vous souhaitez garder libres",
      "Privilégiez les horaires compacts avec moins de longues pauses",
      "Privilégiez les cours du matin ou votre routine préférée",
    ],
    premiumAction: "Premium bientôt disponible",
    perMonth: "/ mois",
    planned: "Prévu",
    faqKicker: "À savoir",
    faqTitle: "Vos questions, nos réponses.",
    faqQuestions: [
      {
        question: "UOPlanner m’inscrit-il aux cours?",
        answer:
          "Non. UOPlanner vous aide à comparer les horaires. Vérifiez les places disponibles et effectuez l’inscription officielle dans votre compte uoZone.",
      },
      {
        question: "Que comprend l’abonnement Premium?",
        answer:
          "Le forfait prévu à 10 $ par mois ajoutera des préférences comme garder certaines journées libres, privilégier les horaires compacts et les cours du matin.",
      },
      {
        question: "Puis-je m’abonner à Premium maintenant?",
        answer:
          "Pas encore. Premium est un forfait proposé; le paiement de l’abonnement n’est pas disponible pour le moment.",
      },
    ],
    startPlanning: "Voir l’exemple d’horaire",
    teamKicker: "Notre mission",
    teamTitle: "Créé par des étudiants, pour les étudiants.",
    teamText:
      "Nous sommes des étudiants en génie logiciel et en informatique à l’Université d’Ottawa. Les difficultés que nous avons rencontrées en planifiant nos cours sont devenues un projet commun.",
    teamMissionKicker: "Ce que nos essais nous ont appris",
    teamMissionTitle: "Les petits casse-têtes s’accumulent.",
    teamMissionText:
      "En équipe, nous avons connu les difficultés courantes : comparer des fiches de cours dispersées, vérifier que les cours magistraux et les laboratoires s’agencent, puis évaluer un horaire sans conflit mais rempli de longues pauses ou de journées peu pratiques. Ces défis communs ont orienté notre objectif : rendre les options d’horaire plus faciles à consulter et à comparer, tout en laissant la vérification des places et l’inscription officielle à uoZone.",
    teamRole: "Co-créateur·rice d’UOPlanner",
    teamProgram: "Génie logiciel ou informatique · Université d’Ottawa",
    teamProgramLabel: "Programme",
    teamContributionLabel: "Contribution",
    teamExpandAction: "Voir la contribution",
    teamCollapseAction: "Retour au portrait",
    teamChallenges: [
      {
        title: "Trouver les bons groupes",
        text:
          "Pendant nos essais, nous avons constaté le temps nécessaire pour rassembler les cours magistraux, les laboratoires et les groupes de discussion répartis dans différentes fiches.",
      },
      {
        title: "Repérer les conflits d’horaire",
        text:
          "En assemblant les cours manuellement, il était facile de manquer un chevauchement. Cette difficulté commune nous a donné envie de comparer les options côte à côte.",
      },
      {
        title: "Ne pas oublier les laboratoires",
        text:
          "L’heure du cours magistral ne suffit pas à voir l’ensemble. Les laboratoires et les tutoriels ajoutent des choix qu’il faut comparer aussi.",
      },
      {
        title: "Éviter les longues pauses",
        text:
          "Nous avons appris qu’un horaire sans conflit peut quand même laisser des trous peu pratiques au milieu de la journée.",
      },
      {
        title: "Savoir ce qu’il faut confirmer",
        text:
          "Un aperçu ne réserve pas de place. Nous gardons le passage vers uoZone bien visible pour que chacun sache où vérifier et s’inscrire.",
      },
    ],
    footerText: "Une semaine plus claire commence par un meilleur plan.",
  },
};

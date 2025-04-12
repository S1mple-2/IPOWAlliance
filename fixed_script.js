document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Initialize text download functionality
    document.getElementById('downloadPDF')?.addEventListener('click', generatePDF);

    // Initialize content toggle
    document.getElementById('toggleContent')?.addEventListener('click', toggleContent);

    // Initialize language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    console.log(`Found ${langButtons.length} language buttons`);
    
    if (langButtons.length === 0) {
        console.error('No language buttons found!');
        return;
    }

    // Text File Generation Function
    function generatePDF() {
        console.log('Download button clicked - initiating text file generation');
        const loadingMsg = document.createElement('div');
        loadingMsg.textContent = 'Generating text file...';
        loadingMsg.style.position = 'fixed';
        loadingMsg.style.top = '20px';
        loadingMsg.style.right = '20px';
        loadingMsg.style.padding = '10px';
        loadingMsg.style.background = 'white';
        loadingMsg.style.border = '1px solid black';
        loadingMsg.style.zIndex = '1000';
        document.body.appendChild(loadingMsg);

        try {
            // Get content - try multiple approaches
            let content = 'Međunarodni Interdisciplinarni inovacijski centar za život "SAVEZ NARODA SVIJETA"\n\n';
            const contentElements = [
                document.getElementById('content'),
                document.querySelector('.document-content'),
                document.querySelector('main'),
                document.querySelector('article')
            ];
            
            for (const el of contentElements) {
                if (el) {
                    content += el.innerText || el.textContent || '';
                    if (content.trim().length > 0) break;
                }
            }
            
            if (content.length <= 60) { // Just header length
                content += document.body.innerText || document.body.textContent || '';
            }

            // Generate filename
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `savez-naroda-svijeta_${timestamp}.txt`;
            
            console.log('Creating download link');
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = filename;
            downloadLink.textContent = 'Click here to download text file';
            downloadLink.style.display = 'block';
            downloadLink.style.margin = '10px 0';
            downloadLink.style.padding = '10px';
            downloadLink.style.background = '#f0f0f0';
            downloadLink.style.border = '1px solid #ccc';
            
            // Remove loading message and show download link
            document.body.removeChild(loadingMsg);
            document.body.appendChild(downloadLink);
            
            // Programmatically click the download link
            downloadLink.click();
            
            // Revoke the object URL to free up memory
            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 100);
        } catch (error) {
            console.error('PDF generation failed:', {
                error: error,
                message: error.message,
                stack: error.stack
            });
            alert('PDF generation failed. Please try again. Error: ' + error.message);
            document.body.removeChild(loadingMsg);
        }
    }

    // Toggle Content Visibility
    function toggleContent() {
        const content = document.getElementById('content');
        if (content) {
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        }
    }

    // Language content
    const translations = {
        bos: {
            title: "Universal Peace Federation (UPF)",
            founded: "Osnovano",
            foundedYear: "2005",
            founder: "Osnivač",
            founderDetails: "Rev. Sun Myung Moon (također osnivač Unification Church)",
            headquarters: "Sjedište",
            headquartersLocation: "New York, SAD",
            status: "Status",
            statusDetails: "NGO sa generalnim konzultativnim statusom pri UN Economic and Social Council (ECOSOC)",
            goals: "Ciljevi UPF-a:",
            goal1: "Promocija mira i međureligijske saradnje",
            goal2: "Podrška ljudskim pravima, porodičnim vrijednostima i moralnom liderstvu",
            goal3: "Poticanje dijaloga između nacija, kultura i religija",
            goal4: "Promocija ideje svijeta kao 'jedne globalne porodice pod Bogom'",
            contact: "Kontakt:",
            email: "email@example.com",
            tel: "Tel: +123 456 789",
            copyright: "© 2025 Sva prava pridržana",
            
            alexproTitle: "ALEX PRO",
            alexproTagline: "ALEX PRO za donosioce odluka",
            realEstate: "Elitne nekretnine",
            mediaCaption1: "Video sadržaj",
            mediaCaption2: "Fotogalerija", 
            mediaCaption3: "Dokumenti",
            realEstateDesc: "Ponude u Moskvi, UAE, Tajlandu, Indoneziji, Turskoj, Španiji i Kipru",
            interiorDesign: "Premium dizajn enterijera",
            interiorDesignDesc: "Vrhunske usluge dizajna enterijera uključujući planiranje, budžetiranje i realizaciju projekta",
            luxuryItems: "Luksuzni artikli i umjetnost",
            luxuryItemsDesc: "Pomoć pri nabavci luksuznih dobara i umjetničkih djela",
            concierge: "VIP Concierge usluge",
            conciergeDesc: "Organizacija ekskluzivnih tura, privatnih letova, iznajmljivanja luksuznih vozila i pristupa događajima",
            grpr: "GR/PR usluge",
            grprDesc: "Odnosi sa vladama i odnosi s javnošću",
            aboutCompany: "O kompaniji",
            aboutDesc: "ALEX PRO naglašava povjerljivost i personalizirane usluge, osiguravajući privatnost i prilagođenu podršku za klijente. Više od 10 godina iskustva u sektoru luksuznih i premium nekretnina.",

            // Ambassador translations
            ambassadorTitle: "Ambasador dr. Alexander Shapiro Suliman",
            currentPositions: "Trenutne pozicije",
            currentPos1: "Osnivački predsjednik Izraelskog Međunarodnog Medicinskog Dijagnostičkog Centra 'Azerbejdžansko-Izraelski Medicinski Centar i VIP Ture', Izrael-Azerbejdžan",
            currentPos2: "Osnivački predsjednik Agro Business & Investment Group Israel, koji posluje u Izraelu, SAD-u, Rusiji, Jordanu, Gruziji, Azerbejdžanu",
            currentPos3: "Potpredsjednik za međunarodne odnose, JSC 'Plant Santex' grupa kompanija, Rusija",
            currentPos4: "Predsjednik za međunarodne odnose međunarodne odvjetničke firme 'Alexander Group', Rusija, Azerbejdžan, Turska, UAE i Izrael",
            currentPos5: "Predsjednik Centra za ekonomski mir u istočnoj Evropi i Rusiji",
            education: "Obrazovanje",
            educationText: "Visoko obrazovanje, Kabardino-Balkarska državna univerzitet, Fakultet nacionalne ekonomije.",
            publicPositions: "Javne i političke pozicije",
            publicPos1: "Ambasador mira - Federacija za svjetski mir od 2005. godine",
            publicPos2: "Stručnjak Međunarodnog odbora za zaštitu ljudskih prava SIPDH, Francuska, Pariz",
            links: "Linkovi",
            link1: "Azerbejdžansko-Izraelski Medicinski Centar",
            link2: "A-SERA Staklenički Kompleks",
            link3: "Federacija za svjetski mir",
            unescoPositions: "Pozicije povezane sa UNESCO",
            unescoPos1: "Predsjednik upravnog odbora budućeg UNESCO centra, MEĐUNARODNI INTERDISCIPLINARNI INOVACIONI CENTAR",
            unescoPos2: "Potpredsjednik (međunarodni odnosi) budućeg UNESCO Centra za mir, Moskva-Pariz",
            foundations: "Fondacije i organizacije",
            foundation1: "Osnivač Fondacije Renesansa u Samtskhe Javakheti, Gruzija (od 2016)",
            foundation2: "Potpredsjednik, Visoki komesar za odnose sa sunarodnicima koji žive u inostranstvu ANO Centar za modeliranje strateškog razvoja, Rusija",
            foundation3: "Prvi potpredsjednik Svjetskog saveza 'Mirotvorac'",
            foundation4: "Službeni predstavnik Svjetske unije HERUT u Ruskoj Federaciji (Izrael)",
            foundation5: "Potpredsjednik za međunarodne odnose Krimske republičke asocijacije blockchain investicionih tehnologija KRABIT, Republika Krim, Rusija",
            businessExperience: "Poslovno iskustvo",
            businessExp1: "Osnivač kompanija u različitim sektorima uključujući zapošljavanje, turizam, preradu otpada, poljoprivredu i medicinske usluge",
            businessExp2: "Aktivni član političke partije Likud (Izrael) od 1998. godine",
            businessExp3: "Osnivač raznih javnih udruženja i organizacija",
            businessExp4: "Učesnik u općinskim i državnim izborima na različitim nivoima",
            businessExp5: "Opsežan komercijalni, investicioni i konsultantski rad na području bivšeg Sovjetskog Saveza i Bliskog istoka od 2007. godine",
            businessOrganizations: "Osnovane poslovne organizacije",
            businessOrg1: "Potpredsjednik CICRAUN Izrael i Komore za trgovinu i industriju zemalja ZND-a",
            businessOrg2: "Potpredsjednik prve asocijacije socijalnih i investicijskih potrošačkih društava 'Denʹ Roždeniâ'"
        },
        eng: {
            title: "Universal Peace Federation (UPF)",
            founded: "Founded",
            foundedYear: "2005",
            founder: "Founder",
            founderDetails: "Rev. Sun Myung Moon (also founder of Unification Church)",
            headquarters: "Headquarters",
            headquartersLocation: "New York, USA",
            status: "Status",
            statusDetails: "NGO with general consultative status at UN Economic and Social Council (ECOSOC)",
            goals: "UPF Goals:",
            goal1: "Promote world peace and interreligious cooperation",
            goal2: "Support human rights, family values, and moral leadership",
            goal3: "Encourage dialogue between nations, cultures, and religions",
            goal4: "Promote the idea of the world as 'one global family under God'",
            contact: "Contact:",
            email: "email@example.com",
            tel: "Tel: +123 456 789",
            copyright: "© 2025 All rights reserved",
            
            // ALEX PRO translations
            alexproTitle: "ALEX PRO",
            alexproTagline: "ALEX PRO for decision makers",
            realEstate: "Elite Real Estate",
            mediaCaption1: "Video Content",
            mediaCaption2: "Photo Gallery",
            mediaCaption3: "Documents",
            realEstateDesc: "Properties in Moscow, UAE, Thailand, Indonesia, Turkey, Spain, and Cyprus",
            interiorDesign: "Premium Interior Design",
            interiorDesignDesc: "High-end interior design services including planning, budgeting, and project realization",
            luxuryItems: "Luxury Items & Art",
            luxuryItemsDesc: "Assistance in acquiring luxury goods and artworks",
            concierge: "VIP Concierge Services",
            conciergeDesc: "Organizing exclusive tours, private flights, luxury vehicle rentals, and event access",
            grpr: "GR/PR Services",
            grprDesc: "Government relations and public relations services",
            aboutCompany: "About the Company",
            aboutDesc: "ALEX PRO emphasizes confidentiality and personalized service, ensuring privacy and tailored assistance for their clients. They have over a decade of experience in the luxury and premium real estate sectors.",

            // Ambassador translations
            ambassadorTitle: "Ambassador Dr. Alexander Shapiro Suliman",
            currentPositions: "Current Positions",
            currentPos1: "Founding President of the Israeli International Medical Diagnostic Center 'Azerbaijani-Israeli Medical Center and VIP Tour', Israel-Azerbaijan",
            currentPos2: "Founding President of Agro Business & Investment Group Israel, operating in Israel, USA, Russia, Jordan, Georgia, Azerbaijan",
            currentPos3: "Vice President for International Relations, JSC 'Plant Santex' group of companies, Russia",
            currentPos4: "President for International Relations of the international law firm 'Alexander Group', Russia, Azerbaijan, Turkey, UAE and Israel",
            currentPos5: "President of the Center for Economic Peace in Eastern Europe and Russia",
            education: "Education",
            educationText: "Higher education, Kabardino-Balkarian State University, Faculty of National Economy.",
            publicPositions: "Public and Political Positions",
            publicPos1: "Ambassador of Peace - Federation for World Peace since 2005",
            publicPos2: "Expert of the International Committee for the Protection of Human Rights SIPDH, France, Paris",
            links: "Links",
            link1: "Azerbaijani-Israeli Medical Center",
            link2: "A-SERA Greenhouse Complex",
            link3: "Federation for World Peace",
            unescoPositions: "UNESCO-related Positions",
            unescoPos1: "Chairman of the Board of Directors of the future UNESCO center, INTERNATIONAL INTERDISCIPLINARY INNOVATION CENTER",
            unescoPos2: "Vice President (International Relations) of the future UNESCO Center for Peace, Moscow-Paris",
            foundations: "Foundations and Organizations",
            foundation1: "Founder of the Renaissance Foundation in Samtskhe Javakheti, Georgia (since 2016)",
            foundation2: "Vice President, High Commissioner for Relations with Compatriots Living Abroad ANO Center for Strategic Development Modeling, Russia",
            foundation3: "First Vice President of the World Union 'Peacemaker'",
            foundation4: "Official Representative of the World Union HERUT in the Russian Federation (Israel)",
            foundation5: "Vice President for International Relations of the Crimean Republican Association of Blockchain Investment Technologies KRABIT, Republic of Crimea, Russia",
            businessExperience: "Business Experience",
            businessExp1: "Founder of companies in various sectors including employment, tourism, waste processing, agriculture and medical services",
            businessExp2: "Active member of the Likud political party (Israel) since 1998",
            businessExp3: "Founder of various public associations and organizations",
            businessExp4: "Participant in municipal and state elections at various levels",
            businessExp5: "Extensive commercial, investment and consulting work in the former Soviet Union and the Middle East since 2007",
            businessOrganizations: "Established Business Organizations",
            businessOrg1: "Vice President of CICRAUN Israel and the Chamber of Commerce and Industry of the CIS countries",
            businessOrg2: "Vice President of the first association of social and investment consumer societies 'Denʹ Roždeniâ'"
        },
        deu: {
            title: "Universal Peace Federation (UPF)",
            founded: "Gegründet",
            foundedYear: "2005",
            founder: "Gründer",
            founderDetails: "Rev. Sun Myung Moon (auch Gründer der Unification Church)",
            headquarters: "Hauptsitz",
            headquartersLocation: "New York, USA",
            status: "Status",
            statusDetails: "NGO mit allgemeinem Beraterstatus beim UN-Wirtschafts- und Sozialrat (ECOSOC)",
            goals: "UPF-Ziele:",
            goal1: "Förderung des Weltfriedens und der interreligiösen Zusammenarbeit",
            goal2: "Unterstützung der Menschenrechte, Familienwerte und moralischen Führung",
            goal3: "Förderung des Dialogs zwischen Nationen, Kulturen und Religionen",
            goal4: "Förderung der Idee der Welt als 'eine globale Familie unter Gott'",
            contact: "Kontakt:",
            email: "email@example.com",
            tel: "Tel: +123 456 789",
            copyright: "© 2025 Alle Rechte vorbehalten",
            
            // ALEX PRO translations
            alexproTitle: "ALEX PRO",
            alexproTagline: "ALEX PRO für Entscheider",
            realEstate: "Luxusimmobilien",
            mediaCaption1: "Videomaterial",
            mediaCaption2: "Fotogalerie",
            mediaCaption3: "Dokumente",
            realEstateDesc: "Angebote in Moskau, VAE, Thailand, Indonesien, Türkei, Spanien und Zypern",
            interiorDesign: "Premium Inneneinrichtung",
            interiorDesignDesc: "Hochwertige Inneneinrichtungsdienstleistungen inklusive Planung, Budgetierung und Projektumsetzung",
            luxuryItems: "Luxusgüter & Kunst",
            luxuryItemsDesc: "Unterstützung beim Erwerb von Luxusgütern и Kunstwerken",
            concierge: "VIP Concierge Service",
            conciergeDesc: "Organisation exklusiver Touren, Privatflüge, Luxusfahrzeugvermietung und Eventzugang",
            grpr: "GR/PR Dienstleistungen",
            grprDesc: "Regierungsbeziehungen und Öffentlichkeitsarbeit",
            aboutCompany: "Über das Unternehmen",
            aboutDesc: "ALEX PRO betont Vertraulichkeit und persönlichen Service, gewährleistet Privatsphäre und maßgeschneiderte Unterstützung für Kunden. Über 10 Jahre Erfahrung im Luxus- und Premium-Immobiliensektor.",
            
            // Ambassador translations
            ambassadorTitle: "Botschafter Dr. Alexander Shapiro Suliman",
            currentPositions: "Aktuelle Positionen",
            currentPos1: "Gründungspräsident des Israelischen Internationalen Medizinischen Diagnostikzentrums 'Aserbaidschanisch-Israelisches Medizinisches Zentrum und VIP-Tour', Israel-Aserbaidschan",
            currentPos2: "Gründungspräsident der Agro Business & Investment Group Israel, tätig in Israel, USA, Russland, Jordanien, Georgien, Aserbaidschan",
            currentPos3: "Vizepräsident für internationale Beziehungen, JSC 'Plant Santex' Unternehmensgruppe, Russland",
            currentPos4: "Präsident für internationale Beziehungen der internationalen Anwaltskanzlei 'Alexander Group', Russland, Aserbaidschan, Türkei, VAE und Israel",
            currentPos5: "Präsident des Zentrums für wirtschaftlichen Frieden in Osteuropa und Russland",
            education: "Bildung",
            educationText: "Hochschulbildung, Kabardino-Balkarische Staatliche Universität, Fakultät für Nationalökonomie.",
            publicPositions: "Öffentliche und politische Positionen",
            publicPos1: "Friedensbotschafter - Föderation für Weltfrieden seit 2005",
            publicPos2: "Experte des Internationalen Ausschusses für den Schutz der Menschenrechte SIPDH, Frankreich, Paris",
            links: "Links",
            link1: "Aserbaidschanisch-Israelisches Medizinisches Zentrum",
            link2: "A-SERA Gewächshauskomplex",
            link3: "Föderation für Weltfrieden",
            unescoPositions: "UNESCO-bezogene Positionen",
            unescoPos1: "Vorsitzender des Verwaltungsrats des zukünftigen UNESCO-Zentrums, INTERNATIONALES INTERDISZIPLINÄRES INNOVATIONSZENTRUM",
            unescoPos2: "Vizepräsident (Internationale Beziehungen) des zukünftigen UNESCO-Zentrums für Frieden, Moskau-Paris",
            foundations: "Stiftungen und Organisationen",
            foundation1: "Gründer der Renaissance-Stiftung in Samtskhe Javakheti, Georgien (seit 2016)",
            foundation2: "Vizepräsident, Hochkommissar für Beziehungen zu im Ausland lebenden Landsleuten ANO Zentrum für strategische Entwicklungsmodellierung, Russland",
            foundation3: "Erster Vizepräsident des Weltverbands 'Friedensstifter'",
            foundation4: "Offizieller Vertreter der Weltunion HERUT in der Russischen Föderation (Israel)",
            foundation5: "Vizepräsident für internationale Beziehungen der Krim-Republikanischen Vereinigung für Blockchain-Investmenttechnologien KRABIT, Republik Krim, Russland",
            businessExperience: "Geschäftserfahrung",
            businessExp1: "Gründer von Unternehmen in verschiedenen Sektoren, einschließlich Beschäftigung, Tourismus, Abfallverarbeitung, Landwirtschaft und medizinische Dienstleistungen",
            businessExp2: "Aktives Mitglied der politischen Partei Likud (Israel) seit 1998",
            businessExp3: "Gründer verschiedener öffentlicher Vereinigungen und Organisationen",
            businessExp4: "Teilnehmer an kommunalen und staatlichen Wahlen auf verschiedenen Ebenen",
            businessExp5: "Umfangreiche kommerzielle, investive und beratende Tätigkeit in der ehemaligen Sowjetunion und im Nahen Osten seit 2007",
            businessOrganizations: "Gegründete Geschäftsorganisationen",
            businessOrg1: "Vizepräsident von CICRAUN Israel und der Handels- und Industriekammer der GUS-Länder",
            businessOrg2: "Vizepräsident der ersten Vereinigung sozialer und investiver Verbrauchergesellschaften 'Denʹ Roždeniâ'"
        },
        rus: {
            title: "Универсальная федерация мира (UPF)",
            founded: "Основана",
            foundedYear: "2005",
            founder: "Основатель",
            founderDetails: "Преподобный Сан Мён Мун (также основатель Церкви Объединения)",
            headquarters: "Штаб-квартира",
            headquartersLocation: "Нью-Йорк, США",
            status: "Статус",
            statusDetails: "НПО с общим консультативным статусом при Экономическом и Социальном Совете ООН (ЭКОСОС)",
            goals: "Цели UPF:",
            goal1: "Продвижение мирового мира и межрелигиозного сотрудничества",
            goal2: "Поддержка прав человека, семейных ценностей и морального лидерства",
            goal3: "Содействие диалогу между нациями, культурами и религиями",
            goal4: "Продвижение идеи мира как 'одной глобальной семьи под Богом'",
            contact: "Контакт:",
            email: "email@example.com",
            tel: "Тел: +123 456 789",
            copyright: "© 2025 Все права защищены",
            
            // ALEX PRO translations
            alexproTitle: "ALEX PRO",
            alexproTagline: "ALEX PRO для принимающих решения", 
            realEstate: "Элитная недвижимость",
            mediaCaption1: "Видео контент",
            mediaCaption2: "Фотогалерея",
            mediaCaption3: "Документы",
            realEstateDesc: "Предложения в Москве, ОАЭ, Таиланде, Индонезии, Турции, Испании и на Кипре",
            interiorDesign: "Премиальный дизайн интерьера",
            interiorDesignDesc: "Высококачественные услуги по дизайну интерьера, включая планирование, бюджетирование и реализацию проекта",
            luxuryItems: "Предметы роскоши и искусство",
            luxuryItemsDesc: "Помощь в приобретении предметов роскоши и произведений искусства",
            concierge: "VIP консьерж-услуги",
            conciergeDesc: "Организация эксклюзивных туров, частных рейсов, аренды роскошных автомобилей и доступа к мероприятиям",
            grpr: "GR/PR услуги",
            grprDesc: "Связи с правительством и связи с общественностью",
            aboutCompany: "О компании",
            aboutDesc: "ALEX PRO подчеркивает конфиденциальность и персонализированный сервис, обеспечивая конфиденциальность и индивидуальную поддержку для своих клиентов. Более 10 лет опыта в секторе роскошной и премиальной недвижимости.",

            // Ambassador translations
            ambassadorTitle: "Посол д-р Александр Шапиро Сулиман",
            currentPositions: "Текущие должности",
            currentPos1: "Основатель и президент Израильского международного медицинского диагностического центра 'Азербайджано-Израильский медицинский центр и VIP-тур', Израиль-Азербайджан",
            currentPos2: "Основатель и президент Agro Business & Investment Group Israel, работающей в Израиле, США, России, Иордании, Грузии, Азербайджане",
            currentPos3: "Вице-президент по международным отношениям, JSC 'Plant Santex' группа компаний, Россия",
            currentPos4: "Президент по международным отношениям международной юридической фирмы 'Alexander Group', Россия, Азербайджан, Турция, ОАЭ и Израиль",
            currentPos5: "Президент Центра экономического мира в Восточной Европе и России",
            education: "Образование",
            educationText: "Высшее образование, Кабардино-Балкарский государственный университет, факультет национальной экономики.",
            publicPositions: "Общественные и политические должности",
            publicPos1: "Посол мира - Федерация за всемирный мир с 2005 года",
            publicPos2: "Эксперт Международного комитета по защите прав человека SIPDH, Франция, Париж",
            links: "Ссылки",
            link1: "Азербайджано-Израильский медицинский центр",
            link2: "A-SERA Тепличный комплекс",
            link3: "Федерация за всемирный мир",
            unescoPositions: "Должности, связанные с ЮНЕСКО",
            unescoPos1: "Председатель правления будущего центра ЮНЕСКО, МЕЖДУНАРОДНЫЙ МЕЖДИСЦИПЛИНАРНЫЙ ИННОВАЦИОННЫЙ ЦЕНТР",
            unescoPos2: "Вице-президент (Международные отношения) будущего Центра ЮНЕСКО за мир, Москва-Париж",
            foundations: "Фонды и организации",
            foundation1: "Основатель Фонда Возрождения в Самцхе-Джавахети, Грузия (с 2016 года)",
            foundation2: "Вице-президент, Верховный комиссар по связям с соотечественниками за рубежом АНО Центр моделирования стратегического развития, Россия",
            foundation3: "Первый вице-президент Всемирного союза 'Миротворец'",
            foundation4: "Официальный представитель Всемирного союза HERUT в Российской Федерации (Израиль)",
            foundation5: "Вице-президент по международным отношениям Крымской республиканской ассоциации блокчейн-инвестиционных технологий KRABIT, Республика Крым, Россия",
            businessExperience: "Бизнес-опыт",
            businessExp1: "Основатель компаний в различных секторах, включая занятость, туризм, переработку отходов, сельское хозяйство и медицинские услуги",
            businessExp2: "Активный член политической партии Ликуд (Израиль) с 1998 года",
            businessExp3: "Основатель различных общественных объединений и организаций",
            businessExp4: "Участник муниципальных и государственных выборов на различных уровнях",
            businessExp5: "Обширная коммерческая, инвестиционная и консультационная работа на территории бывшего Советского Союза и Ближнего Востока с 2007 года",
            businessOrganizations: "Созданные бизнес-организации",
            businessOrg1: "Вице-президент CICRAUN Израиль и Торгово-промышленной палаты стран СНГ",
            businessOrg2: "Вице-президент первой ассоциации социальных и инвестиционных потребительских обществ 'День Рождения'"
        }
    };

    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log(`Language button clicked: ${this.dataset.lang}`);
            const lang = this.dataset.lang;
            
            if (!translations[lang]) {
                console.error(`No translations found for language: ${lang}`);
                return;
            }
            
            // Update active button
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update content
            const upfInfo = document.querySelector('.upf-info');
            if (!upfInfo) {
                console.error('UPF info section not found!');
                return;
            }
            upfInfo.querySelector('h2').textContent = translations[lang].title;
            
            // Update info item headings and content
            const infoItems = upfInfo.querySelectorAll('.info-item');
            infoItems[0].querySelector('h3').textContent = translations[lang].founded;
            infoItems[0].querySelector('p').textContent = translations[lang].foundedYear;
            infoItems[1].querySelector('h3').textContent = translations[lang].founder;
            infoItems[1].querySelector('p').textContent = translations[lang].founderDetails;
            infoItems[2].querySelector('h3').textContent = translations[lang].headquarters;
            infoItems[2].querySelector('p').textContent = translations[lang].headquartersLocation;
            infoItems[3].querySelector('h3').textContent = translations[lang].status;
            infoItems[3].querySelector('p').textContent = translations[lang].statusDetails;
            
            const missionSection = upfInfo.querySelector('.mission-section');
            missionSection.querySelector('h3').textContent = translations[lang].goals;
            
            const goals = missionSection.querySelectorAll('li');
            goals[0].textContent = translations[lang].goal1;
            goals[1].textContent = translations[lang].goal2;
            goals[2].textContent = translations[lang].goal3;
            goals[3].textContent = translations[lang].goal4;
            
            // Update ALEX PRO content
            const alexproInfo = document.querySelector('.alexpro-info');
            if (!alexproInfo) {
                console.error('ALEX PRO info section not found!');
            } else {
                alexproInfo.querySelector('h2').textContent = translations[lang].alexproTitle;
                alexproInfo.querySelector('.tagline').textContent = translations[lang].alexproTagline;
                
                const serviceItems = alexproInfo.querySelectorAll('.service-item');
                serviceItems[0].querySelector('h3').textContent = translations[lang].realEstate;
                serviceItems[0].querySelector('p').textContent = translations[lang].realEstateDesc;
                serviceItems[1].querySelector('h3').textContent = translations[lang].interiorDesign;
                serviceItems[1].querySelector('p').textContent = translations[lang].interiorDesignDesc;
                serviceItems[2].querySelector('h3').textContent = translations[lang].luxuryItems;
                serviceItems[2].querySelector('p').textContent = translations[lang].luxuryItemsDesc;
                serviceItems[3].querySelector('h3').textContent = translations[lang].concierge;
                serviceItems[3].querySelector('p').textContent = translations[lang].conciergeDesc;
                serviceItems[4].querySelector('h3').textContent = translations[lang].grpr;
                serviceItems[4].querySelector('p').textContent = translations[lang].grprDesc;
                
                const aboutSection = alexproInfo.querySelector('.about-section');
                aboutSection.querySelector('h3').textContent = translations[lang].aboutCompany;
                aboutSection.querySelector('p').textContent = translations[lang].aboutDesc;
            }
            
            // Update ambassador content
            const ambassadorBio = document.querySelector('.ambassador-bio');
            if (ambassadorBio) {
                ambassadorBio.querySelector('h2').textContent = translations[lang].ambassadorTitle;
                
                const bioSections = ambassadorBio.querySelectorAll('.bio-section');
                
                // Current Positions
                bioSections[0].querySelector('h3').textContent = translations[lang].currentPositions;
                const currentPosItems = bioSections[0].querySelectorAll('li');
                currentPosItems[0].textContent = translations[lang].currentPos1;
                currentPosItems[1].textContent = translations[lang].currentPos2;
                currentPosItems[2].textContent = translations[lang].currentPos3;
                currentPosItems[3].textContent = translations[lang].currentPos4;
                currentPosItems[4].textContent = translations[lang].currentPos5;
                
                // Education
                bioSections[1].querySelector('h3').textContent = translations[lang].education;
                bioSections[1].querySelector('p').textContent = translations[lang].educationText;
                
                // Public Positions
                bioSections[2].querySelector('h3').textContent = translations[lang].publicPositions;
                const publicPosItems = bioSections[2].querySelectorAll('li');
                publicPosItems[0].textContent = translations[lang].publicPos1;
                publicPosItems[1].textContent = translations[lang].publicPos2;
                
                // Links
                bioSections[3].querySelector('h3').textContent = translations[lang].links;
                const linkItems = bioSections[3].querySelectorAll('a');
                linkItems[0].textContent = translations[lang].link1;
                linkItems[1].textContent = translations[lang].link2;
                linkItems[2].textContent = translations[lang].link3;
                
                // UNESCO Positions
                bioSections[4].querySelector('h3').textContent = translations[lang].unescoPositions;
                const unescoPosItems = bioSections[4].querySelectorAll('li');
                unescoPosItems[0].textContent = translations[lang].unescoPos1;
                unescoPosItems[1].textContent = translations[lang].unescoPos2;
                
                // Foundations
                bioSections[5].querySelector('h3').textContent = translations[lang].foundations;
                const foundationItems = bioSections[5].querySelectorAll('li');
                foundationItems[0].textContent = translations[lang].foundation1;
                foundationItems[1].textContent = translations[lang].foundation2;
                foundationItems[2].textContent = translations[lang].foundation3;
                foundationItems[3].textContent = translations[lang].foundation4;
                foundationItems[4].textContent = translations[lang].foundation5;
                
                // Business Experience
                bioSections[6].querySelector('h3').textContent = translations[lang].businessExperience;
                const businessExpItems = bioSections[6].querySelectorAll('li');
                businessExpItems[0].textContent = translations[lang].businessExp1;
                businessExpItems[1].textContent = translations[lang].businessExp2;
                businessExpItems[2].textContent = translations[lang].businessExp3;
                businessExpItems[3].textContent = translations[lang].businessExp4;
                businessExpItems[4].textContent = translations[lang].businessExp5;
                
                // Business Organizations
                bioSections[7].querySelector('h3').textContent = translations[lang].businessOrganizations;
                const businessOrgItems = bioSections[7].querySelectorAll('li');
                businessOrgItems[0].textContent = translations[lang].businessOrg1;
                businessOrgItems[1].textContent = translations[lang].businessOrg2;
            }

            // Update media section
            const mediaSection = document.querySelector('.media-section');
            if (mediaSection) {
                const mediaItems = mediaSection.querySelectorAll('.media-item');
                mediaItems.forEach((item, index) => {
                    const caption = item.querySelector('figcaption');
                    if (caption) {
                        caption.textContent = translations[lang][`mediaCaption${index + 1}`] || '';
                    }
                });
            }
            
            // Update footer content
            const footerParagraphs = document.querySelectorAll('footer p');
            footerParagraphs[0].textContent = `${translations[lang].contact} ${translations[lang].email} | ${translations[lang].tel}`;
            footerParagraphs[1].textContent = translations[lang].copyright;
        });
    });
});

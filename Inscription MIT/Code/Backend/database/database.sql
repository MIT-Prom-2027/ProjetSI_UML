-- Création de la base
CREATE DATABASE uml_inscription;
\c uml_inscription;

-- Types ENUM
CREATE TYPE type_piece_jointe AS ENUM ('PHOTO', 'CIN_VERSO' , 'RELEVE_DE_NOTE', 'RECU_FACULTE', 'RESIDENCE', 'CIN_RECTO' );
CREATE TYPE type_statut_inscription AS ENUM ('en attente', 'validé', 'Rejetté');
CREATE TYPE type_genre AS ENUM ('O', 'M', 'F');

CREATE TYPE nationalite_enum AS ENUM (
    'AFGHANISTAN',
    'AFRIQUE_DU_SUD',
    'ALBANIE',
    'ALGERIE',
    'ALLEMAGNE',
    'ANDORRE',
    'ANGOLA',
    'ARABIE_SAOUDITE',
    'ARGENTINE',
    'ARMENIE',
    'AUSTRALIE',
    'AUTRICHE',
    'AZERBAIDJAN',
    'BAHAMAS',
    'BANGLADESH',
    'BELGIQUE',
    'BELIZE',
    'BENIN',
    'BHOUTAN',
    'BIELORUSSIE',
    'BIRMANIE',
    'BOLIVIE',
    'BOSNIE',
    'BOTSWANA',
    'BRESIL',
    'BRUNEI',
    'BULGARIE',
    'BURKINA_FASO',
    'BURUNDI',
    'CAMBODGE',
    'CAMEROUN',
    'CANADA',
    'CAP_VERT',
    'CHILI',
    'CHINE',
    'CHYPRE',
    'COLOMBIE',
    'COMORES',
    'CONGO',
    'COREE_DU_SUD',
    'COREE_DU_NORD',
    'COSTA_RICA',
    'COTE_D_IVOIRE',
    'CROATIE',
    'CUBA',
    'DANEMARK',
    'DJIBOUTI',
    'DOMINIQUE',
    'EGYPTE',
    'EMIRATS_ARABES_UNIS',
    'EQUATEUR',
    'ERYTHREE',
    'ESPAGNE',
    'ESTONIE',
    'ESWATINI',
    'ETATS_UNIS',
    'ETHIOPIE',
    'FINLANDE',
    'FRANCE',
    'GABON',
    'GAMBIE',
    'GEORGIE',
    'GHANA',
    'GRECE',
    'GRENADE',
    'GUATEMALA',
    'GUINEE',
    'GUINEE_BISSAU',
    'GUINEE_EQUATORIALE',
    'GUYANA',
    'HAITI',
    'HONDURAS',
    'HONGRIE',
    'INDE',
    'INDONESIE',
    'IRAN',
    'IRAK',
    'IRLANDE',
    'ISLANDE',
    'ISRAEL',
    'ITALIE',
    'JAMAIQUE',
    'JAPON',
    'JORDANIE',
    'KAZAKHSTAN',
    'KENYA',
    'KIRGHIZISTAN',
    'KIRIBATI',
    'KOSOVO',
    'KOWEIT',
    'LAOS',
    'LESOTHO',
    'LETTONIE',
    'LIBAN',
    'LIBERIA',
    'LIBYE',
    'LIECHTENSTEIN',
    'LITUANIE',
    'LUXEMBOURG',
    'MACEDOINE',
    'MADAGASCAR',
    'MALAISIE',
    'MALAWI',
    'MALDIVES',
    'MALI',
    'MALTE',
    'MAROC',
    'MARSHALL',
    'MAURICE',
    'MAURITANIE',
    'MEXIQUE',
    'MICRONESIE',
    'MOLDAVIE',
    'MONACO',
    'MONGOLIE',
    'MONTENEGRO',
    'MOZAMBIQUE',
    'MYANMAR',
    'NAMIBIE',
    'NAURU',
    'NEPAL',
    'NICARAGUA',
    'NIGER',
    'NIGERIA',
    'NORVEGE',
    'NOUVELLE_ZELANDE',
    'OMAN',
    'OUGANDA',
    'OUZBEKISTAN',
    'PAKISTAN',
    'PALAOS',
    'PALESTINE',
    'PANAMA',
    'PAPOUASIE',
    'PARAGUAY',
    'PAYS_BAS',
    'PEROU',
    'PHILIPPINES',
    'POLOGNE',
    'PORTUGAL',
    'QATAR',
    'REPUBLIQUE_CENTRAFRICAINE',
    'REPUBLIQUE_DOMINICAINE',
    'REPUBLIQUE_TCHEQUE',
    'ROUMANIE',
    'ROYAUME_UNI',
    'RUSSIE',
    'RWANDA',
    'SAINT_KITTS',
    'SAINT_MARIN',
    'SAINT_VINCENT',
    'SALVADOR',
    'SAMOA',
    'SENEGAL',
    'SERBIE',
    'SEYCHELLES',
    'SIERRA_LEONE',
    'SINGAPOUR',
    'SLOVAQUIE',
    'SLOVENIE',
    'SOMALIE',
    'SOUDAN',
    'SRI_LANKA',
    'SUEDE',
    'SUISSE',
    'SURINAME',
    'SYRIE',
    'TADJIKISTAN',
    'TAIWAN',
    'TANZANIE',
    'TCHAD',
    'THAILANDE',
    'TIMOR_ORIENTAL',
    'TOGO',
    'TONGA',
    'TRINITE_ET_TOBAGO',
    'TUNISIE',
    'TURKMENISTAN',
    'TURQUIE',
    'UKRAINE',
    'URUGUAY',
    'VANUATU',
    'VATICAN',
    'VENEZUELA',
    'VIETNAM',
    'YEMEN',
    'ZAMBIE',
    'ZIMBABWE'
);

-- Tables
CREATE TABLE etudiant (
	id_etudiant varchar(100) primary key,
	nom varchar(100) not null,
	prenom varchar(100),
	email varchar(50),
	tel varchar(20) not null,
	num_inscription varchar(40) not null,
	serie varchar(3) not null,
	date_naissance date,
	lieu_naissance varchar(100),
	nationalite nationalite_enum,
	genre type_genre not null,
	adresse varchar(100),
	cin varchar(12)
);

CREATE TABLE niveau (
	id_niveau int primary key,
	niv varchar(10) not null unique,
	descr varchar(100)
);

CREATE TABLE parcour (
	id_parcour int primary key,
	parcour varchar(10) not null unique,
	descr varchar(100),
	id_niveau int,
	foreign key (id_niveau) references niveau(id_niveau)
);

CREATE TABLE annee_univ (
	id_annee_univ varchar(50) primary key,
	date_debut date not null,
	date_fin date not null
);

CREATE TABLE date_inscription (
	id_date_inscription serial primary key,
	date_debut date not null,
	date_fin date default null,
	annee_univ varchar(50),
	foreign key (annee_univ) references annee_univ(id_annee_univ)
);

CREATE TABLE inscription (
	id_inscription serial primary key,
	id_etudiant varchar(100),
    id_niveau int not null,
    id_parcour int not null,
	annee_univ varchar(50),	
	statut type_statut_inscription default 'en attente',
	date_soumission date default CURRENT_DATE,
	info_complet BOOLEAN default FALSE,
	foreign key (id_etudiant) references etudiant(id_etudiant),
	foreign key (annee_univ) references annee_univ(id_annee_univ),
    foreign key (id_niveau) references niveau(id_niveau),
    foreign key (id_parcour) references parcour(id_parcour)


);


CREATE TABLE piece_jointe (
	id_piece_jointe serial primary key,
	id_inscription int,
	id_etudiant varchar(100),
	type_doc type_piece_jointe,
	fichier varchar(100) not null,
	foreign key (id_etudiant) references etudiant(id_etudiant),
	foreign key (id_inscription) references inscription(id_inscription)
);


CREATE TABLE selected (
	id int primary key,
	nom varchar(100) not null,
	prenom varchar(100),
	niveau_id int,
	parcour_id int, 
	annee_univ_id varchar(50),
	foreign key (niveau_id) references niveau(id_niveau),
	foreign key (parcour_id) references parcour(id_parcour),
	foreign key (annee_univ_id) references annee_univ(id_annee_univ)
);

CREATE TABLE badge (
	id_badge int primary key,
	lien varchar(200) not null,
	id_inscription int,
	foreign key (id_inscription) references inscription(id_inscription)
);

-- Connexion à la base
\c uml_inscription;

-- 1. Insertion dans `annee_univ`
INSERT INTO annee_univ (id_annee_univ, date_debut, date_fin) VALUES
('2024-2025', '2024-10-01', '2025-07-30');

-- 2. Insertion dans `date_inscription`
INSERT INTO date_inscription (date_debut, date_fin, annee_univ) VALUES
('2024-09-01', '2026-10-15', '2024-2025');

-- 3. Insertion dans `niveau`
INSERT INTO niveau (id_niveau, niv, descr) VALUES
(1, 'L1', 'Licence 1'),
(2, 'L2', 'Licence 2'),
(3, 'L3', 'Licence 3');

-- 4. Insertion dans `parcour`
INSERT INTO parcour (id_parcour, parcour, descr, id_niveau) VALUES
(1, 'INFO1', 'Informatique', 1),
(2, 'GEST1', 'Gestion', 1),
(3, 'INFO2', 'Informatique', 2),
(4, 'GEST2', 'Gestion', 2);

-- 5. Insertion dans `etudiant`
INSERT INTO etudiant (
    id_etudiant, nom, prenom, email, tel, num_inscription,
    serie, date_naissance, lieu_naissance, nationalite, genre, adresse,cin
) VALUES
('ETU001', 'Rakoto', 'Jean', 'rakoto.jean@example.com', '0321234567', '2024-001',
 'S', '2003-05-14', 'Antananarivo', 'MADAGASCAR', 'M','adresse 1','12345678901'),
('ETU002', 'Rasoa', 'Marie', 'rasoa.marie@example.com', '0349876543', '2024-002',
 'L', '2002-11-21', 'Fianarantsoa', 'MADAGASCAR', 'F','adresse 2','09876543212');

-- 8. Insertion dans `selected`
INSERT INTO selected (
    id, nom, prenom, niveau_id, parcour_id, annee_univ_id
) VALUES
(1, 'Rakoto', 'Jean', 1, 1, '2024-2025'),
(2, 'Rasoa', 'Marie', 1, 2, '2024-2025');

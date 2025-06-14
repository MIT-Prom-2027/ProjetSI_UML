--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: iantso
--

CREATE TYPE public."Role" AS ENUM (
    'Etudiant',
    'Enseignant',
    'Delegue'
);


ALTER TYPE public."Role" OWNER TO iantso;

--
-- Name: StatusPresence; Type: TYPE; Schema: public; Owner: iantso
--

CREATE TYPE public."StatusPresence" AS ENUM (
    'Present',
    'Absent'
);


ALTER TYPE public."StatusPresence" OWNER TO iantso;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Cours; Type: TABLE; Schema: public; Owner: iantso
--

CREATE TABLE public."Cours" (
    id text NOT NULL,
    id_matiere text NOT NULL,
    date_deb timestamp(3) without time zone NOT NULL,
    date_fin timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Cours" OWNER TO iantso;

--
-- Name: Matiere; Type: TABLE; Schema: public; Owner: iantso
--

CREATE TABLE public."Matiere" (
    id text NOT NULL,
    titre text NOT NULL
);


ALTER TABLE public."Matiere" OWNER TO iantso;

--
-- Name: Personne; Type: TABLE; Schema: public; Owner: iantso
--

CREATE TABLE public."Personne" (
    id text NOT NULL,
    nom text NOT NULL,
    prenom text NOT NULL,
    mdp text NOT NULL,
    email text NOT NULL,
    role public."Role" NOT NULL
);


ALTER TABLE public."Personne" OWNER TO iantso;

--
-- Name: Presence; Type: TABLE; Schema: public; Owner: iantso
--

CREATE TABLE public."Presence" (
    id text NOT NULL,
    id_cours text NOT NULL,
    id_etudiant text NOT NULL,
    is_valid boolean DEFAULT false NOT NULL,
    status public."StatusPresence" NOT NULL
);


ALTER TABLE public."Presence" OWNER TO iantso;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: iantso
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO iantso;

--
-- Data for Name: Cours; Type: TABLE DATA; Schema: public; Owner: iantso
--

COPY public."Cours" (id, id_matiere, date_deb, date_fin) FROM stdin;
cmbmd6m6l0001ijle99nwr5if	cmbhxnqrz0002ij73lv9t05af	2025-06-07 18:00:00	2025-06-07 20:00:00
cmbt18g9m0001ijckye4wnx6x	cmbhxnqrz0002ij73lv9t05af	2025-06-12 10:00:00	2025-06-12 14:00:00
\.


--
-- Data for Name: Matiere; Type: TABLE DATA; Schema: public; Owner: iantso
--

COPY public."Matiere" (id, titre) FROM stdin;
cmbhxnchv0000ij73c74mzo46	Mathématiques
cmbhxnjtf0001ij7368z2zfeq	GPI
cmbhxnqrz0002ij73lv9t05af	Transformation digitale
cmbhxnyq80003ij73giskmojc	Analyse numérique
cmbhxo5jr0004ij73924iumg8	Communication
\.


--
-- Data for Name: Personne; Type: TABLE DATA; Schema: public; Owner: iantso
--

COPY public."Personne" (id, nom, prenom, mdp, email, role) FROM stdin;
cmbhye7710000ijej4r8bjh9y	Harrice	Brice Privat	$2b$12$Qq/BzW/fzUzlMhhZisdHC.N0I9gGLqkvuDbUUg8T4T4055EiqI89i	brice292@gmail.com	Etudiant
cmbi7o8b50000ijmjhyd3h1jm	RAZAFINDRAZAKA	Iantso Christian	$2b$12$gWyfMNTAyu0GZr9vP.qlperGG2jQqZmfb6bAm77Hu.Eb.lhlfKNCq	iantsochristianrazafindrazaka@gmail.com	Etudiant
cmbkj466a0000ijj2nc9fzixf	ANDRIAMAHAROARIVO	Christianah	$2b$12$wuA8P.hfpNueiXzzivSQmuPvsqQNJarEgRB0R7NoCkgZM7l3TXISW	christianah@gmail.com	Enseignant
cmbt1xg260004ijck8mf5in0f	HERIMAMPIONONA	Santatrasoa Diary	$2b$12$Zc0oFCcX9jq9DS8eNi4kVe5CcOAaBlkts0ghz3INb5/5orBFSiNJu	diary@gmail.com	Enseignant
\.


--
-- Data for Name: Presence; Type: TABLE DATA; Schema: public; Owner: iantso
--

COPY public."Presence" (id, id_cours, id_etudiant, is_valid, status) FROM stdin;
cmbmd8hqz0001ijw1r8o926k5	cmbmd6m6l0001ijle99nwr5if	cmbi7o8b50000ijmjhyd3h1jm	t	Absent
cmbt1hwly0003ijcknpn4g6z6	cmbt18g9m0001ijckye4wnx6x	cmbi7o8b50000ijmjhyd3h1jm	f	Present
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: iantso
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
bdf35ae6-f2ce-4d61-a541-7203eeb6db5d	7d87df3b1c833f35da99fe396ead59ed44d8bd569096646a75296ab236ba0105	2025-06-04 15:09:47.24105+03	20250604120946_model_init	\N	\N	2025-06-04 15:09:47.20559+03	1
1fea0f87-3b4d-45d4-b1b3-9e1b6ffdcb40	e808370a1deb46aca7013ef878d1dc0f96d3a91571bbdddb36c44b4a5805ecd5	2025-06-04 15:54:13.783745+03	20250604125413_changing_key	\N	\N	2025-06-04 15:54:13.764037+03	1
5ff30b4f-eed9-4d30-8b23-608fa1766bb0	5aaed2729076e5249573b169ddc15bb81d49b014b5a249a436e1e245ec57c6f6	2025-06-04 16:11:14.583092+03	20250604131114_changing_key_2	\N	\N	2025-06-04 16:11:14.565324+03	1
a587d26c-43ca-4c7c-87ff-fea1bb435d6e	985e3b4f0f2a8b3d00ab9974f2d82c9ceea2c6bc03e2fde17a7f830f05987cfb	2025-06-04 16:50:47.127992+03	20250604135046_adding_key	\N	\N	2025-06-04 16:50:47.110381+03	1
1606d1d7-ab5d-492d-98e4-b5a83bb6db66	f212f1fc9902a1267a9a0b9fc8b06db91157fca3898e013be92da850e825bc9e	2025-06-07 17:53:33.953912+03	20250607145333_adding_presence_status	\N	\N	2025-06-07 17:53:33.93461+03	1
\.


--
-- Name: Cours Cours_pkey; Type: CONSTRAINT; Schema: public; Owner: iantso
--

ALTER TABLE ONLY public."Cours"
    ADD CONSTRAINT "Cours_pkey" PRIMARY KEY (id);


--
-- Name: Matiere Matiere_pkey; Type: CONSTRAINT; Schema: public; Owner: iantso
--

ALTER TABLE ONLY public."Matiere"
    ADD CONSTRAINT "Matiere_pkey" PRIMARY KEY (id);


--
-- Name: Personne Personne_pkey; Type: CONSTRAINT; Schema: public; Owner: iantso
--

ALTER TABLE ONLY public."Personne"
    ADD CONSTRAINT "Personne_pkey" PRIMARY KEY (id);


--
-- Name: Presence Presence_pkey; Type: CONSTRAINT; Schema: public; Owner: iantso
--

ALTER TABLE ONLY public."Presence"
    ADD CONSTRAINT "Presence_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: iantso
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Matiere_titre_key; Type: INDEX; Schema: public; Owner: iantso
--

CREATE UNIQUE INDEX "Matiere_titre_key" ON public."Matiere" USING btree (titre);


--
-- Name: Personne_email_key; Type: INDEX; Schema: public; Owner: iantso
--

CREATE UNIQUE INDEX "Personne_email_key" ON public."Personne" USING btree (email);


--
-- Name: Cours Cours_id_matiere_fkey; Type: FK CONSTRAINT; Schema: public; Owner: iantso
--

ALTER TABLE ONLY public."Cours"
    ADD CONSTRAINT "Cours_id_matiere_fkey" FOREIGN KEY (id_matiere) REFERENCES public."Matiere"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Presence Presence_id_cours_fkey; Type: FK CONSTRAINT; Schema: public; Owner: iantso
--

ALTER TABLE ONLY public."Presence"
    ADD CONSTRAINT "Presence_id_cours_fkey" FOREIGN KEY (id_cours) REFERENCES public."Cours"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Presence Presence_id_etudiant_fkey; Type: FK CONSTRAINT; Schema: public; Owner: iantso
--

ALTER TABLE ONLY public."Presence"
    ADD CONSTRAINT "Presence_id_etudiant_fkey" FOREIGN KEY (id_etudiant) REFERENCES public."Personne"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--


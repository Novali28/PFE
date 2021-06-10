DROP TABLE IF EXISTS periode;
DROP TABLE IF EXISTS volume_hebdomadaire;
DROP TABLE IF EXISTS groupe_par_intervenant;
DROP TABLE IF EXISTS volume_global;
DROP TABLE IF EXISTS groupe_sous_total;
DROP TABLE IF EXISTS formation;
DROP TABLE IF EXISTS element_constitutif;
DROP TABLE IF EXISTS bilan;
DROP TABLE IF EXISTS limite_sous_total;
DROP TABLE IF EXISTS intervenant;
DROP TABLE IF EXISTS projet;
DROP TABLE IF EXISTS enseignant;
DROP TABLE IF EXISTS statut;

CREATE TABLE `statut` (
  `statut_id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NOT NULL,
  `surnom` VARCHAR(45) NOT NULL,
  `qtte_heures` VARCHAR(45) NOT NULL,
  `qtte_heures_sup` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`statut_id`));


CREATE TABLE `enseignant` (
  `enseignant_id` INT NOT NULL AUTO_INCREMENT,
  `prenom` VARCHAR(45) NOT NULL,
  `nom` VARCHAR(45) NOT NULL,
  `surnom` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `statut_id` INT NOT NULL,
    FOREIGN KEY (statut_id)
      REFERENCES statut(statut_id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
  PRIMARY KEY (`enseignant_id`));


CREATE TABLE `projet` (
  `projet_id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NOT NULL,
  `date` DATE NOT NULL,
  `verrou` BOOLEAN NOT NULL,
  `archive` BOOLEAN NOT NULL,
  PRIMARY KEY (`projet_id`));


CREATE TABLE `intervenant` (
  `intervenant_id` INT NOT NULL AUTO_INCREMENT,
    `enseignant_id` INT NOT NULL,
    FOREIGN KEY (enseignant_id)
      REFERENCES enseignant(enseignant_id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
    `projet_id` INT NOT NULL,
    FOREIGN KEY (projet_id)
      REFERENCES projet(projet_id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
    `qtte_heures` INT NOT NULL,
  	`qtte_heures_sup` INT NOT NULL,
  PRIMARY KEY (`intervenant_id`));


CREATE TABLE `limite_sous_total` (
  `limite_sous_total_id` INT NOT NULL AUTO_INCREMENT,
  `projet_id` INT NOT NULL,
  FOREIGN KEY (projet_id)
      REFERENCES projet(projet_id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
  `nom` VARCHAR(45) NULL,
  `limite_eqtd` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`limite_sous_total_id`));


CREATE TABLE `bilan` (
  `bilan_id` INT NOT NULL AUTO_INCREMENT,
  	`limite_sous_total_id` INT NOT NULL,
    FOREIGN KEY (limite_sous_total_id)
      REFERENCES limite_sous_total(limite_sous_total_id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
  `projet_id` INT NOT NULL,
  FOREIGN KEY (projet_id)
      REFERENCES projet(projet_id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
  PRIMARY KEY (`bilan_id`));


CREATE TABLE `element_constitutif` (
  `element_constitutif_id` INT NOT NULL AUTO_INCREMENT,
  `titre` VARCHAR(45) NOT NULL,
  `code` VARCHAR(45) NOT NULL,
  `niveau` INT NOT NULL,
  `parent` INT,
    FOREIGN KEY (parent)
      REFERENCES element_constitutif(element_constitutif_id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
  `indice_fils` INT NOT NULL,
  `volume_heures_prevues` INT NOT NULL,
  `mode_saisie_heure` INT NOT NULL,
  `type_cours_autorises` VARCHAR(45) NOT NULL,
  `forfait` VARCHAR(45) NOT NULL,
  `nombre_groupe_effectif` INT NOT NULL,
  PRIMARY KEY (`element_constitutif_id`));


CREATE TABLE `formation` (
  `formation_id` INT NOT NULL AUTO_INCREMENT,
    `projet_id` INT NOT NULL,
    FOREIGN KEY (projet_id)
      REFERENCES projet(projet_id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
  `verrou` BOOLEAN NOT NULL,
    `element_constitutif_id`INT NOT NULL,
    FOREIGN KEY (element_constitutif_id)
      REFERENCES element_constitutif(element_constitutif_id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
  PRIMARY KEY (`formation_id`));


CREATE TABLE `groupe_sous_total` (
  `groupe_sous_total_id` INT NOT NULL AUTO_INCREMENT,
    `limite_sous_total_id`INT NOT NULL,
    FOREIGN KEY (limite_sous_total_id)
      REFERENCES limite_sous_total(limite_sous_total_id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
    `element_constitutif_id`INT NOT NULL,
    FOREIGN KEY (element_constitutif_id)
      REFERENCES element_constitutif(element_constitutif_id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
  PRIMARY KEY (`groupe_sous_total_id`));


CREATE TABLE `volume_global` (
  `volume_global_id` INT NOT NULL AUTO_INCREMENT,
    `element_constitutif_id`INT NOT NULL,
    FOREIGN KEY (element_constitutif_id)
      REFERENCES element_constitutif(element_constitutif_id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
    `intervenant_id`INT NOT NULL,
    FOREIGN KEY (intervenant_id)
      REFERENCES intervenant(intervenant_id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
    `volume` INT NOT NULL,
  PRIMARY KEY (`volume_global_id`));


CREATE TABLE `groupe_par_intervenant` (
	`groupe_par_intervenant_id` INT NOT NULL AUTO_INCREMENT,
    `element_constitutif_id`INT NOT NULL,
    FOREIGN KEY (element_constitutif_id)
      REFERENCES element_constitutif(element_constitutif_id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
    `numero_semaine` INT NOT NULL,
    `intervenant_id`INT NOT NULL,
    FOREIGN KEY (intervenant_id)
      REFERENCES intervenant(intervenant_id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
    `nombre_groupes` INT NOT NULL,
  PRIMARY KEY (`groupe_par_intervenant_id`));


CREATE TABLE `volume_hebdomadaire` (
	`volume_hebdomadaire_id` INT NOT NULL AUTO_INCREMENT,
    `element_constitutif_id`INT NOT NULL,
    FOREIGN KEY (element_constitutif_id)
      REFERENCES element_constitutif(element_constitutif_id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
    `numero_semaine` INT NOT NULL,
    `volume_heure` INT NOT NULL,
  PRIMARY KEY (`volume_hebdomadaire_id`));


CREATE TABLE `periode` (
	`periode_id` INT NOT NULL AUTO_INCREMENT,
    `element_constitutif_id`INT NOT NULL,
    FOREIGN KEY (element_constitutif_id)
      REFERENCES element_constitutif(element_constitutif_id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
    `nombre_semaine` INT NOT NULL,
    `nombre_groupes_default` INT NOT NULL,
  PRIMARY KEY (`periode_id`));



// src/lib/focal-points.ts
// Source: DFC National Network roster. Names only — emails/affiliations omitted on purpose.
export interface CountryFocalPoint { country: string; iso3: string; names: string[]; }

export const PROJECT_LEAD = {
  name: 'Gonzalo Meschengieser',
  role: 'Project Lead',
};

export const FOCAL_POINTS: { region: string; entries: CountryFocalPoint[] }[] = [
  { region: 'Latin America', entries: [
    { country: 'Argentina', iso3: 'ARG', names: ['Angie Gómez Pizarro', 'Mariano Kristoff', 'Juan Iervasi', 'Gonzalo Meschengieser'] },
    { country: 'Brazil',     iso3: 'BRA', names: ['Neylor de Lima Fabiano'] },
    { country: 'Colombia',   iso3: 'COL', names: ['Sandra Esther Gaitán Hidalgo'] },
    { country: 'Mexico',     iso3: 'MEX', names: ['Enrique Avila Barra', 'Jorge Eduardo Casillas Navarro'] },
  ]},
  { region: 'Africa', entries: [
    { country: 'Kenya',        iso3: 'KEN', names: ['Scholastica Ngari'] },
    { country: 'Ethiopia',     iso3: 'ETH', names: ['Beza Abrham Tamiru', 'Betelhem'] },
    { country: 'Ghana',        iso3: 'GHA', names: ['Dr. Blissbern Appiagyei Osei-Owusu', 'Lydia Otoo Amponsah', 'Enoch Yeboah Agyepong'] },
    { country: 'South Africa', iso3: 'ZAF', names: ['Namisha Muthraparsad', 'Nicolette Vermaak'] },
    { country: 'Tanzania',     iso3: 'TZA', names: ['Dr. Josephine Donald Mremi'] },
    { country: 'Uganda',       iso3: 'UGA', names: ['Monicah Elizabeth Seruma'] },
    { country: 'Burkina Faso', iso3: 'BFA', names: ['Valentin Tiama', 'Maimouna Bologo/Traoré'] },
    { country: 'Mali',         iso3: 'MLI', names: ['Yacouba Diarra'] },
    { country: 'Nigeria',      iso3: 'NGA', names: ['Eucharia Ebere Ezeudegbunam', 'Odun Akinyele', 'Latifah Lawal', "Musa Juliet Ma'a", 'Nasiru Usman', 'Daniel Kayode', 'Ibe Vivian'] },
  ]},
  { region: 'Asia', entries: [
    { country: 'India',   iso3: 'IND', names: ['Prateek Kumawat', 'Deepak Kumar Singhal'] },
    { country: 'Nepal',   iso3: 'NPL', names: ['Nabin Joshi'] },
    { country: 'Vietnam', iso3: 'VNM', names: ['Ngo Tho Hung', 'Dinh Xuan Lam', 'Nguyen Dang Tinh', 'Do Phuong Hien'] },
  ]},
];

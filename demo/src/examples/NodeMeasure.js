import React, {Component} from 'react';

import Tree from '../../../src/TreeContainer';
import Renderers from '../../../src/renderers';
import {createEntry} from '../toolbelt';
import {getNodeRenderOptions} from '../../../src/selectors/nodes';

const {Expandable} = Renderers;

const Nodes = [
  {
    id: 'arg',
    name: 'Argentina',
    children: [
      {
        id: 'messi',
        name: 'Leo Messi',
        children: [{id: 'messi-desc', name: ''}],
      },
      {
        id: 'maradona',
        name: 'Diego Maradona',
        children: [{id: 'maradona-desc', name: ''}],
      },
    ],
  },
  {
    id: 'pt',
    name: 'Portugal',
    children: [
      {
        id: 'cr',
        name: 'Cristiano Ronaldo',
        children: [{id: 'cr-desc', name: ''}],
      },
      {
        id: 'figo',
        name: 'Luis Figo',
        children: [{id: 'figo-desc', name: ''}],
      },
    ],
  },
  {
    id: 'br',
    name: 'Brazil',
    children: [
      {
        id: 'r',
        name: 'Ronaldo',
        children: [{id: 'r-desc', name: ''}],
      },
      {
        id: 'r10',
        name: 'Ronaldinho',
        children: [{id: 'r10-desc', name: ''}],
      },
      {
        id: 'pele',
        name: 'Pele',
        children: [{id: 'pele-desc', name: ''}],
      },
    ],
  },
  {
    id: 'fr',
    name: 'France',
    children: [
      {
        id: 'z',
        name: 'Zinedine Zidane',
        children: [{id: 'z-desc', name: ''}],
      },
      {
        id: 'pl',
        name: 'Michel Platini',
        children: [{id: 'pl-desc', name: ''}],
      },
    ],
  },
];

const DESCRIPTIONS = {
  fr:
    'France (French: [fʁɑ̃s]), officially the French Republic (French: République française, pronounced [ʁepyblik fʁɑ̃sɛz]), is a country whose territory consists of metropolitan France in western Europe, as well as several overseas regions and territories.[XIII] The metropolitan area of France extends from the Mediterranean Sea to the English Channel and the North Sea, and from the Rhine to the Atlantic Ocean. The overseas territories include French Guiana in South America and several islands in the Atlantic, Pacific and Indian oceans. The countrys 18 integral regions (five of which are situated overseas) span a combined area of 643,801 square kilometres (248,573 sq mi) which, as of October 2017, has a population of 67.15 million people.[10] France is a unitary semi-presidential republic with its capital in Paris, the countrys largest city and main cultural and commercial centre. Other major urban centres include Marseille, Lyon, Lille, Nice, Toulouse and Bordeaux.',
  arg:
    'Argentina (/ˌɑːrdʒənˈtiːnə/ (About this sound listen); Spanish: [aɾxenˈtina]), officially the Argentine Republic[A] (Spanish: República Argentina), is a federal republic located mostly in the southern half of South America. Sharing the bulk of the Southern Cone with its neighbor Chile to the west, the country is also bordered by Bolivia and Paraguay to the north, Brazil to the northeast, Uruguay and the South Atlantic Ocean to the east, and the Drake Passage to the south. With a mainland area of 2,780,400 km2 (1,073,500 sq mi),[B] Argentina is the eighth-largest country in the world, the second largest in Latin America, and the largest Spanish-speaking nation. It is subdivided into twenty-three provinces (Spanish: provincias, singular provincia) and one autonomous city (ciudad autónoma), Buenos Aires, which is the federal capital of the nation (Spanish: Capital Federal) as decided by Congress.[11] The provinces and the capital have their own constitutions, but exist under a federal system. Argentina claims sovereignty over part of Antarctica, the Falkland Islands (Spanish: Islas Malvinas), and South Georgia and the South Sandwich Islands.',
  pt:
    'Portugal (Portuguese: [puɾtuˈɣaɫ]), officially the Portuguese Republic (Portuguese: República Portuguesa ,[note 1] is a sovereign state located mostly on the Iberian Peninsula in southwestern Europe. It is the westernmost country of mainland Europe, being bordered to the west and south by the Atlantic Ocean and to the north and east by Spain. Its territory also includes the Atlantic archipelagos of the Azores and Madeira, both autonomous regions with their own regional governments. At 1.7 million km2, its Exclusive Economic Zone is the 3rd largest in the European Union and the 11th largest in the world.[10]',
  br:
    'Brazil (/brəˈzɪl/ (About this sound listen); Portuguese: Brasil [bɾaˈziw][10]), officially the Federative Republic of Brazil (Portuguese: República Federativa do Brasil, About this sound listen (help·info)[11]), is the largest country in both South America and Latin America. At 8.5 million square kilometers (3.2 million square miles)[12] and with over 208 million people, Brazil is the worlds fifth-largest country by area and the sixth-most populous. The capital is Brasília, and the most-populated city is São Paulo. It is the largest country to have Portuguese as an official language and the only one in the Americas.[13][14] Bounded by the Atlantic Ocean on the east, Brazil has a coastline of 7,491 kilometers (4,655 mi).[15] It borders all other South American countries except Ecuador and Chile and covers 47.3% of the continents land area.[16] Its Amazon River basin includes a vast tropical forest, home to diverse wildlife, a variety of ecological systems, and extensive natural resources spanning numerous protected habitats.[15] This unique environmental heritage makes Brazil one of 17 megadiverse countries, and is the subject of significant global interest and debate regarding deforestation and environmental protection.',
  messi:
    'Lionel Andrés Messi Cuccittini[note 1] (Spanish pronunciation: [ljoˈnel anˈdɾez ˈmesi] (About this sound listen);[A] born 24 June 1987) is an Argentine professional footballer who plays as a forward for Spanish club FC Barcelona and the Argentina national team. Often considered the best player in the world and regarded by many as the greatest of all time, Messi has a record-tying five Ballon dOr awards,[note 2] four of which he won consecutively, and a record-tying four European Golden Shoes.[note 3] He has spent his entire professional career with Barcelona, where he has won 29 trophies, including eight La Liga titles, four UEFA Champions League titles, and five Copas del Rey. Both a prolific goalscorer and a creative playmaker, Messi holds the records for most official goals scored in La Liga (368), a La Liga season (50), a club football season in Europe (73), a calendar year (91), El Clásico (26), as well as those for most assists made in La Liga (146) and the Copa América (11). He has scored over 600 senior career goals for club and country.',
  maradona:
    'Diego Armando Maradona Franco (Spanish pronunciation: [ˈdjeɣo maɾaˈðona], born 30 October 1960) is an Argentine retired professional footballer and manager. Many in the sport, including football writers, players, and fans, regard Maradona as the greatest football player of all time.[7][8][9][10][11] He was joint FIFA Player of the 20th Century with Pelé.[12][13]',
  cr:
    'Cristiano Ronaldo dos Santos Aveiro GOIH, ComM (European Portuguese: [kɾiʃˈtjɐnu ʁoˈnaɫdu]; born 5 February 1985) is a Portuguese professional footballer who plays as a forward for Spanish club Real Madrid and the Portugal national team. Often considered the best player in the world and widely regarded as the greatest of all time,[note 1] Ronaldo has five Ballon dOr awards,[note 2] the most for a European player and is tied for most all-time. He is the first player in history to win four European Golden Shoes. He has won 25 trophies in his career, including five league titles, four UEFA Champions League titles and one UEFA European Championship. A prolific goalscorer, Ronaldo holds the records for most official goals scored in the top five European leagues (380), the UEFA Champions League (116), the UEFA European Championship (29) and the FIFA Club World Cup (7), as well as most goals scored in a UEFA Champions League season (17). He has scored more than 600 senior career goals for club and country.',
  figo:
    'Luís Filipe Madeira Caeiro Figo, OIH (Portuguese pronunciation: [luˈiʃ ˈfiɣu]; born 4 November 1972) is a retired Portuguese footballer. He played as a midfielder for Sporting CP, Barcelona, Real Madrid and Internazionale before retiring on 31 May 2009. He won 127 caps for the Portugal national team, a record at the time but later broken by Cristiano Ronaldo.',
  r:
    'Ronaldo Luís Nazário de Lima (locally [ʁoˈnawdu ˈlwiʒ nɐˈzaɾju dʒ ˈɫĩmɐ]; born 18 September 1976[2]), commonly known as Ronaldo, is a retired Brazilian professional footballer who played as a striker. Popularly dubbed "O Fenômeno" (The Phenomenon), he is widely considered to be one of the greatest football players of all time.[3][4][5][6][7] In his prime, he was known for his dribbling at speed, feints, and clinical finishing.',
  r10:
    'Ronaldo de Assis Moreira (born 21 March 1980), commonly known as Ronaldinho (Brazilian Portuguese: [ʁonawˈdʒĩɲu]) or Ronaldinho Gaúcho,[note 1] is a Brazilian former professional footballer and ambassador for Spanish club Barcelona.[4] He played mostly as an attacking midfielder, but was also deployed as a forward or a winger. He played the bulk of his career at European clubs Paris Saint-Germain, Barcelona and Milan as well as playing for the Brazilian national team. Often considered one of the best players of his generation and regarded by many as one of the greatest of all time,[note 2] Ronaldinho won two FIFA World Player of the Year awards and a Ballon dOr. He was renowned for his technical skills and creativity; due to his agility, pace and dribbling ability, as well as his use of tricks, overhead kicks, no-look passes and accuracy from free-kicks.',
  pele:
    'Edson Arantes do Nascimento (Brazilian Portuguese: [ˈɛtsõ (w)ɐˈɾɐ̃tʃiz du nɐsiˈmẽtu]; born 23 October 1940), known as Pelé ([peˈlɛ]), is a Brazilian retired professional footballer who played as a forward. He is widely regarded as the greatest football player of all time. In 1999, he was voted World Player of the Century by the International Federation of Football History & Statistics (IFFHS). That same year, Pelé was elected Athlete of the Century by the International Olympic Committee. According to the IFFHS, Pelé is the most successful league goal-scorer in the world, scoring 1281 goals in 1363 games, which included unofficial friendlies and tour games. During his playing days, Pelé was for a period the best-paid athlete in the world.',
  z:
    'Zinedine Yazid Zidane O.L.H., A.O.M.N. (French pronunciation: [zinedin zidan], born 23 June 1972), nicknamed "Zizou", is a French retired professional footballer and current manager of Real Madrid. He played as an attacking midfielder for the France national team, Cannes, Bordeaux, Juventus and Real Madrid.[3][4] An elite playmaker, renowned for his elegance, vision, ball control and technique, Zidane was named the best European footballer of the past 50 years in the UEFA Golden Jubilee Poll in 2004.[5] He is widely regarded as one of the greatest players of all time',
  pl:
    'Michel François Platini (born 21 June 1955) is a French former football player, manager and administrator. Nicknamed Le Roi (The King) for his ability and leadership, he is regarded as one of the greatest footballers of all time. Platini won the Ballon dOr three times, in 1983, 1984 and 1985,[3] and came sixth in the FIFA Player of the Century vote.[4] In recognition of his achievements, he was named Chevalier of the Legion of Honour in 1985 and became Officier in 1988.',
};

class FootballPlayerRenderer extends React.Component {
  componentDidMount() {
    this.props.measure();
  }

  render() {
    const {node, children} = this.props;
    const {id, name} = node;
    const {isExpanded} = getNodeRenderOptions(node);

    return (
      <span>
        {children}
        <b>{name}</b>
        {isExpanded && <p>{DESCRIPTIONS[id]}</p>}
      </span>
    );
  }
}

class NodeMeasure extends Component {
  state = {
    nodes: Nodes,
  };

  handleChange = nodes => {
    this.setState({nodes});
  };

  render() {
    return (
      <Tree nodes={this.state.nodes} onChange={this.handleChange}>
        {({style, ...p}) => (
          <div style={style}>
            <FootballPlayerRenderer {...p}>
              <Expandable {...p} />
            </FootballPlayerRenderer>
          </div>
        )}
      </Tree>
    );
  }
}

export default createEntry(
  'node-measure',
  'NodeMeasure',
  'Nodes with auto measure',
  <div>
    <p>All cells in react-virtualized-tree implement react-virtualized's CellMeasurer</p>
    <p>
      All nodes receive a measure prop that can be used to measure nodes with different heights like what happens in
      this example
    </p>
  </div>,
  NodeMeasure,
);

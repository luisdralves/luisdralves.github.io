var colours = {
	'#000000': 'Preto',
	'#000080': 'Naval',
	'#00008b': 'Azul escuro',
	'#0000cd': 'Azul médio',
	'#0000dd': 'Azul real',
	'#0000ff': 'Azul',
	'#0014a8': 'Zaffre',
	'#0047ab': 'Azul cobalto',
	'#006400': 'Verde escuro',
	'#007fff': 'Azul celeste brilhante',
	'#008000': 'Verde',
	'#008080': 'Verde-azulado',
	'#008b8b': 'Ciano escuro',
	'#00a4cd': 'Azul celeste pernambucano',
	'#00a86b': 'Jade',
	'#00bdce': 'Azul brasilis',
	'#00bfff': 'Azul céu profundo',
	'#00ccee': 'Azul turquesa',
	'#00ced1': 'Turquesa escura',
	'#00ddff': 'Azul turquesa brilhante',
	'#00fa9a': 'Verde primavera médio',
	'#00ff00': 'Limão',
	'#00ff00': 'Verde espectro',
	'#00ff7f': 'Verde primavera',
	'#00ffff': 'Ciano',
	'#00ffff': 'Água',
	'#054f77': 'Azul camarada',
	'#084d6e': 'Azul petróleo',
	'#09acdb': 'Azul brasilis brilhante',
	'#111111': 'Quantum',
	'#120a8f': 'Azul marinho',
	'#191970': 'Azul meia-noite',
	'#1e90ff': 'Azul furtivo',
	'#20b2aa': 'Verde mar claro',
	'#228b22': 'Verde floresta',
	'#248eff': 'Azul taparuere',
	'#2e8b57': 'Herbal',
	'#2f4f4f': 'Cinza ardósia escuro',
	'#32cd32': 'Verde lima',
	'#3cb371': 'Verde mar médio',
	'#3d2b1f': 'Fuligem',
	'#40e0d0': 'Turquesa',
	'#44d7a8': 'Eucalipto',
	'#4682b4': 'Azul aço',
	'#483d8b': 'Azul ardósia escuro',
	'#48d1cc': 'Turquesa média',
	'#4b0082': 'Índigo',
	'#4c516d': 'Independência',
	'#50c878': 'Esmeralda',
	'#51484f': 'Quartz',
	'#550000': 'Vermelho enegrecido',
	'#555d50': 'Ébano',
	'#556b2f': 'Oliva escura',
	'#5a4fcf': 'Íris',
	'#5d8aa8': 'Azul força aérea',
	'#5f9ea0': 'Azul cadete',
	'#6495ed': 'Azul flor de milho',
	'#66cdaa': 'Água-marinha média',
	'#696969': 'Cinza fosco',
	'#6a5acd': 'Azul ardósia',
	'#6b4423': 'Kobicha',
	'#6b8e23': 'Oliva parda',
	'#6c3082': 'Eminência',
	'#6d351a': 'Rútilo',
	'#705714': 'Sépia',
	'#708090': 'Cinza ardósia',
	'#712f26': 'Carmim',
	'#738678': 'Xanadu',
	'#778899': 'Cinza ardósia claro',
	'#778899': 'Dainise',
	'#78866b': 'Verde militar',
	'#7b68ee': 'Azul ardósia médio',
	'#7ba05b': 'Aspargo',
	'#7cfc00': 'Verde grama',
	'#7fff00': 'Verde Paris',
	'#7fffd4': 'Água-marinha',
	'#800000': 'Bordô',
	'#800080': 'Púrpura',
	'#808000': 'Oliva',
	'#808080': 'Cinza',
	'#831d1c': 'Grená',
	'#8470ff': 'Azul ardósia claro',
	'#87ceeb': 'Azul céu',
	'#87cefa': 'Azul céu claro',
	'#8878c3': 'Ube',
	'#89cff0': 'Azul bebê',
	'#8a008a': 'Roxo brasilis',
	'#8a2be2': 'Azul violeta',
	'#8b0000': 'Castanho avermelhado',
	'#8b0000': 'Vermelho escuro',
	'#8b008b': 'Magenta escuro',
	'#8b4513': 'Marrom sela',
	'#8b5742': 'Caramelo',
	'#8ee53f': 'Kiwi',
	'#8fbc8f': 'Verde mar escuro',
	'#900020': 'Borgonha',
	'#90ee90': 'Verde claro',
	'#9370db': 'Púrpura média',
	'#9400d3': 'Violeta escuro',
	'#960018': 'Carmim carnáceo',
	'#964b00': 'Marrom',
	'#98fb98': 'Verde pálido',
	'#992244': 'Carmim clássico',
	'#9932cc': 'Orquídea escura',
	'#993399': 'Roxo',
	'#9966cc': 'Ametista',
	'#9acd32': 'Verde amarelado',
	'#a2006d': 'Flerte',
	'#a52a2a': 'Marrom claro',
	'#a6aa3e': 'Azul manteiga',
	'#a7f432': 'Brasil',
	'#a9a9a9': 'Cinza escuro',
	'#add8e6': 'Azul claro',
	'#adff2f': 'Amarelo esverdeado',
	'#afeeee': 'Turquesa pálida',
	'#b0c4de': 'Azul aço claro',
	'#b0e0e6': 'Azul pólvora',
	'#b22222': 'Tijolo refratário',
	'#b53389': 'Fandango',
	'#b7410e': 'Ferrugem',
	'#b87333': 'Cobre',
	'#b8860b': 'Dourado escuro',
	'#b8cad4': 'Azul areado',
	'#ba55d3': 'Orquídea média',
	'#bc8f8f': 'Marrom rosado',
	'#bdb76b': 'Caqui escuro',
	'#be5b59': 'Goiaba',
	'#c0c0c0': 'Prata',
	'#c71585': 'Vermelho violeta médio',
	'#c8a2c8': 'Lilás',
	'#cc6600': 'Pardo escuro',
	'#cc7722': 'Ocre',
	'#ccff33': 'Verde fluorescente',
	'#cd5c5c': 'Vermelho indiano',
	'#cd69cd': 'Rosa amoroso',
	'#cd7f32': 'Bronze',
	'#cd853f': 'Pardo',
	'#d02090': 'Vermelho violeta',
	'#d2691e': 'Chocolate',
	'#d2b48c': 'Castanho claro',
	'#d3d3d3': 'Cinza claro',
	'#d8bfd8': 'Cardo',
	'#da69a1': 'Rosa danação',
	'#da70d6': 'Orquídea',
	'#daa520': 'Dourado',
	'#db7093': 'Vermelho violeta pálido',
	'#dc143c': 'Carmesim',
	'#dcdcdc': 'Cinza médio',
	'#dcdcdc': 'Gainsboro',
	'#dda0dd': 'Ameixa',
	'#de3163': 'Cereja',
	'#deb887': 'Madeira',
	'#df73ff': 'Heliotrópio',
	'#e0b0ff': 'Malva',
	'#e0ffff': 'Ciano claro',
	'#e2725b': 'Terracota',
	'#e32636': 'Alizarina',
	'#e6e6fa': 'Lavanda',
	'#e6e8fa': 'Glitter',
	'#e79fc4': 'Kobi',
	'#e9967a': 'Salmão escuro',
	'#e9ffdb': 'Nyanza',
	'#ec2300': 'Urucum',
	'#ecd690': 'Amarelo creme',
	'#ecdb00': 'Amarelo brasilis',
	'#ed9121': 'Cenoura',
	'#ee82ee': 'Violeta',
	'#eead2d': 'Amarelo queimado',
	'#eee8aa': 'Dourado pálido',
	'#f08080': 'Coral claro',
	'#f0dc82': 'Couro',
	'#f0e68c': 'Caqui',
	'#f0f8ff': 'Azul alice',
	'#f0fff0': 'Maná',
	'#f0ffff': 'Azul celeste',
	'#f28500': 'Tangerina',
	'#f2b73f': 'Amarelo escuro',
	'#f400a1': 'Cereja Hollywood',
	'#f4a460': 'Marrom amarelado',
	'#f4c430': 'Açafrão',
	'#f5deb3': 'Trigo',
	'#f5f5dc': 'Bege',
	'#f5f5f5': 'Branco fumaça',
	'#f5fffa': 'Creme de menta',
	'#f8cbf8': 'Violeta claro',
	'#f8de7e': 'Jasmine',
	'#f8f8ff': 'Branco fantasma',
	'#fa7f72': 'Salmão',
	'#faebd7': 'Branco antigo',
	'#faf0e6': 'Linho',
	'#fafad2': 'Amarelo ouro claro',
	'#fbec5d': 'Milho',
	'#fc0fc0': 'Rosa Choque',
	'#fdd5b1': 'Feldspato',
	'#fde910': 'Lima',
	'#fdf5e6': 'Renda antiga',
	'#ff0000': 'Vermelho',
	'#ff007f': 'Rosa brilhante',
	'#ff00ff': 'Fúchsia',
	'#ff00ff': 'Magenta',
	'#ff1493': 'Rosa profundo',
	'#ff2400': 'Escarlate',
	'#ff2401': 'Triássico',
	'#ff4500': 'Jambo',
	'#ff6347': 'Tomate',
	'#ff69b4': 'Rosa forte',
	'#ff7f50': 'Coral',
	'#ff8247': 'Siena',
	'#ff8c00': 'Laranja escuro',
	'#ffa07a': 'Salmão claro',
	'#ffa500': 'Laranja',
	'#ffb6c1': 'Rosa claro',
	'#ffb84d': 'Laranja claro',
	'#ffbf00': 'Âmbar',
	'#ffcbdb': 'Rosa',
	'#ffd700': 'Ouro',
	'#ffdab9': 'Pêssego',
	'#ffdb58': 'Mostarda',
	'#ffdead': 'Branco navajo',
	'#ffe4b5': 'Mocassim',
	'#ffe4c4': 'Creme de marisco',
	'#ffe4e1': 'Rosa embaçado',
	'#ffebcd': 'Amêndoa',
	'#ffefd5': 'Mamão batido',
	'#fff0f5': 'Lavanda avermelhada',
	'#fff5ee': 'Concha',
	'#fff8dc': 'Milho Claro',
	'#fffaf0': 'Branco floral',
	'#fffafa': 'Neve',
	'#fffdd0': 'Creme',
	'#ffff00': 'Amarelo',
	'#ffffe0': 'Amarelo claro',
	'#fffff0': 'Marfim',
	'#ffffff': 'Branco'
}

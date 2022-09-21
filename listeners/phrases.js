const fs = require("fs");
const path = require('path');
const { MessageEmbed, Interaction } = require('discord.js');

japonais = ["あ","い","う","え","お","か","き","く","け","こ","さ","し","す","せ","そ","た","ち","つ","て","と","な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ","ま","み","む","め","も","や","ゆ","よ","ら","り","る","れ","ろ","わ","を","ん","が","ぎ","ぐ","げ","ご","ざ",
	    "じ","ず","ぜ","ぞ","だ","じ","づ","で","ど","ば","び","ぶ","べ","ぼ","ぱ","ぴ","ぷ","ぺ","ぽ","ア","イ","ウ","エ","オ","カ","キ","ク","ケ","コ","サ","シ","ス","セ","ソ","タ","チ","ツ","テ","ト","ナ","ニ","ヌ","ネ","ノ",
	    "ハ","ヒ","フ","ヘ","ホ","マ","ミ","ム","メ","モ","ヤ","ユ","ヨ","ラ","リ","ル","レ","ロ","ワ","ヲ","ン","ガ","ギ","グ","ゲ","ゴ",
	    "ザ","ジ","ズ","ゼ","ゾ","ダ","ヂ","ヅ","デ","ド","バ","ビ","ブ","ベ","ボ","パ","ピ","プ","ペ","ポ", "一","二","三","四","五","六","七","八","九","十","人","今","日","週","月","年","中","山","川","左","右","大","木","本","水","火","父","母","耳","口","休","何","入","上","前","下","千","午","友","古","名","国","外","女","男","子","学","生","小","書","毎","先","会","万","円","出","分","北","半","南","土","多","天","安","少","店","後","手","新","時","来","東","校","気","白","百","目","社","空","立","聞","花","行","西","見","言","話","語","読","買","足","車","道","金","長","間","雨","電","食","飲","駅","高","魚","力","夕","工","元","止","引","牛","区","犬","不","文","方","心","切","太","代","台","世","正","田","冬","民","用","兄","以","去","仕","市","広","主","写","字","自","考","合","光","好","死"," 回","有","同","肉","色","早","地","池","村","体","町","低","弟","走","赤","図","究","声","売","別","医","近","私","作","住","者","事","使","始","姉","英","京","画","妹","味","服","物","歩","門","夜","明","林","青","所","注","知","昼"," 茶","待","洗","送","品","洋","便","風","発","度","映","海","界","屋","音","急","計","建","研","県","思","乗","重","春","室","持","首","秋","借","弱","紙","帰","起","夏","家","院","員","病","勉","特","旅","料","真","通","鳥","転","族"," 進","理","野","問","都","堂","動","悪","強","教","産","黒","菜","終","習","集","場","寒","軽","運","開","飯","答","森","暑","朝","貸","着","短","働","楽","暗","意","遠","漢","業","試","銀","歌","説","質","館","親","頭","薬","曜","題"," 顔","験","丸","久","才","支","戸","欠","王","化","内","反","比","夫","仏","毛","予","由","未","布","包","末","平","辺","氷","付","皮","犯","必","石","他","打","加","可","央","刊","玉","旧","号","皿","札","史","失","示","申","礼","令"," 列","老","式","州","寺","次","守","糸","在","再","向","交","血","件","共","曲","各","印","因","羽","団","竹","仲","虫","兆","伝","当","成","全","争","任","米","両","利","余","防","役","返","判","臣","身","折","努","投","対","束","谷"," 位","囲","完","角","快","改","技","局","君","均","形","決","芸","求","希","告","材","坂","似","児","状","初","助","労","冷","例","和","述","承","招","実","取","治","受","周","妻","参","枝","刷","効","幸","固","季","岸","岩","泣","協"," 居","苦","具","果","河","官","委","易","育","泳","直","定","底","的","性","昔","制","卒","非","波","板","版","念","武","表","命","府","放","法","油","勇","要","負","迷","約","面","変","飛","美","独","則","相","草","祖","信","政","星"," 点","追","単","炭","退","栄","科","活","胃","級","軍","係","型","客","逆","限","厚","指","昨","祝","神","査","省","酒","笑","消","師","財","殺","差","残","航","根","個","候","庫","記","訓","害","格","荷","帯","島","庭","徒","席","息"," 造","孫","速","能","配","倍","破","馬","浴","容","流","留","連","陸","率","略","望","務","敗","部","副","婦","側","組","責","接","船","商","設","雪","清","深","得","第","停","断","貨","液","移","経","規","寄","許","球","救","険","現"," 混","祭","細","術","宿","章","常","情","植","順","象","焼","勝","歯","最","散","港","検","湖","期","喜","結","景","給","雲","営","温","過","絵","階","覚","貯","達","測","童","等","湯","登","程","絶","然","富","復","費","番","悲","筆"," 備","貿","無","報","満","量","遊","落","陽","葉","税","路","豊","夢","農","続","損","想","戦","勢","数","置","鉄","感","解","園","愛","塩","極","禁","罪","資","準","種","雑","際","算","察","構","関","境","漁","演","慣","管","銅","適"," 精","製","静","像","増","総","鼻","複","鳴","綿","様","領","緑","練","歴","輪","編","箱","熱","選","線","導","談","調","横","確","課","器","賛","賞","機","橋","築","積","輸","録","績","講","職","観","額","類","願","識","競","議","了"," 与","亡","干","介","互","公","双","片","匹","払","幼","庁","占","込","冊","司","処","収","召","巨","甘","圧","永","衣","汚","汗","危","宇","灰","仮","叫","机","吸","舟","宅","存","忙","灯","肌","否","抜","沈","戻","坊","兵","麦","批"," 乱","卵","忘","良","伸","辛","吹","床","条","志","伺","困","含","更","迎","貝","応","押","欧","延","依","拡","価","券","肩","呼","肯","祈","供","況","刺","刻","昇","若","姓","担","宙","怖","並","沸","宝","抱","枚","泥","毒","突","届"," 彼","拝","杯","泊","到","乳","逃","背","畑","怒","珍","保","秒","封","律","柱","段","城","専","泉","浅","柔","拾","咲","紅","香","砂","狭","挟","荒","郊","故","枯","皆","革","看","巻","案","軒","原","恵","降","胸","恐","座","耕","骨"," 脂","修","純","将","捜","除","針","値","恥","畜","涙","恋","粉","浮","疲","被","途","捕","眠","娘","埋","展","倒","党","凍","般","悩","盗","脳","猫","軟","販","訪","符","貧","閉","粒","涼","欲","翌","郵","紹","頂","著","張","袋","探"," 掃","窓","授","捨","婚","採","済","偶","掘","康","健","異","黄","乾","基","域","械","菓","割","換","奥","偉","越","敬","減","雇","硬","御","隅","勤","喫","湿","詞","畳","装","善","晴","尊","替","超","遅","絡","湾","腕","幅","普","評"," 帽","補","募","棒","晩","鈍","塔","筒","痛","渡","殿","塗","賃","福","腹","零","裏","溶","預","暖","節","寝","蒸","触","照","署","辞","腰","歳","詰","靴","群","傾","鉱","違","煙","較","誤","疑","誌","緒","憎","層","踊","暮","滴","認"," 髪","暴","標","膚","舞","論","蔵","駐","震","諸","劇","権","億","鋭","賢","整","操","頼","壁","磨","薄","燃","濃","曇","優","齢","療","燥","濯","環","簡","贈","難","爆","臓","警","乙","丁","刀","又","凡","寸","及","弓","己","士","丈"," 刃","冗","升","尺","氏","幻","孔","凶","斤","井","刈","仁","斗","爪","屯","弔","丹","勿","尤","厄","匂","乏","丙","弁","尼","矛","矢","旦","只","叩","凸","斥","仙","瓦","凹","丘","句","甲","玄","巧","功","穴","叱","囚","汁","尻","丼"," 匠","巡","旬","充","芝","朱","至","旨","后","江","此","刑","仰","朽","吉","企","缶","芋","扱","伊","舌","尽","迅","壮","吐","吊","羊","吏","劣","妄","朴","弐","如","伐","帆","妃","伏","肘","扶","芳","邦","尾","伯","伴","尿","妊","忍"," 把","妨","吠","没","妙","励","呂","抑","里","呈","廷","豆","那","択","沢","即","汰","妥","芯","杉","亜","壱","沖","我","戒","肝","岐","忌","却","汽","狂","吟","系","克","攻","坑","孝","抗","呉","沙","災","佐","寿","秀","序","抄","肖"," 尚","松","沼","宗","呪","邪","叔","舎","肢","昆","忽","祉","侍","弦","股","拘","茎","屈","径","享","拒","拠","宜","奇","拐","劾","芽","怪","岳","於","往","殴","岡","佳","沿","炎","宛","或","枢","炊","垂","拙","析","斉","征","其","阻"," 狙","拓","卓","忠","抽","奈","抵","坪","邸","迭","典","炉","岬","免","茂","盲","房","肪","牧","奔","抹","枕","拍","迫","肥","披","泌","奉","泡","併","苗","附","侮","枠","茹","郎","眉","柄","赴","卑","派","肺","胞","盆","某","冒","殆"," 柳","厘","幽","訂","津","亭","帝","剃","貞","峠","洞","衷","挑","勅","胎","胆","奏","促","耐","怠","俗","荘","牲","宣","窃","染","甚","是","哀","威","為","姻","疫","架","卸","垣","冠","括","悔","咳","紀","軌","虐","糾","峡","契","皇"," 垢","孤","恒","洪","拷","弧","姿","施","恨","砕","削","拶","狩","俊","臭","昭","叙","盾","浄","侵","唇","娠","振","浸","症","准","徐","宵","祥","称","従","疾","殉","珠","殊","酌","射","唆","宰","剤","桟","蚕","剛","栽","索","桜","娯"," 悟","倹","兼","剣","貢","郡","桑","恭","脅","挙","宮","飢","既","鬼","陥","華","蚊","株","釜","核","恩","俺","益","悦","宴","浦","挨","凄","粋","衰","辱","陣","扇","栓","逝","隻","挿","泰","袖","倉","素","租","託","逐","秩","致","透"," 討","桃","匿","胴","逓","哲","唐","倫","竜","朗","烈","剖","紋","耗","脈","紡","梅","這","俳","納","秘","班","畔","倣","俸","砲","峰","陛","姫","紐","俵","浜","敏","紛","浪","脇","瓶","票","描","偏","崩","舶","排","陪","粘","培","堀"," 麻","密","猛","訳","累","隆","陵","猟","悠","唯","庸","悼","笛","添","偵","壷","釣","豚","陶","彫","帳","窒","眺","陳","逮","脱","蛋","淡","粗","爽","措","曽","曹","巣","惜","崇","盛","旋","推","据","酔","尉","陰","逸","殻","掛","勘"," 郭","喝","渇","崖","涯","眼","患","貫","偽","脚","虚","菌","郷","啓","菊","掲","渓","蛍","頃","控","惨","執","視","崎","紺","彩","斎","惚","赦","斜","釈","寂","蛇","粛","淑","渋","訟","梢","渉","庶","唱","剰","紳","尋","硝","殖","掌"," 循","焦","晶","証","詔","粧","就","衆","軸","煮","詐","裁","紫","滋","傘","策","慌","項","絞","喧","圏","堅","喉","遇","琴","筋","暁","僅","距","閑","欺","棋","稀","貴","敢","棺","款","喚","堪","揮","幾","賀","椅","街","渦","握","援"," 詠","随","遂","酢","診","葬","属","惰","揃","堕","疎","喪","創","訴","弾","棚","隊","塚","棟","痘","統","堤","提","貼","搭","揚","揺","雄","湧","猶","裕","嵐","塁","痢","硫","廊","裂","愉","貰","婿","媒","覗","廃","博","筈","蛮","扉"," 傍","遍","塀","雰","惑","壺","賄","碗","墓","飽","搬","微","鉢","煩","頒","漠","盟","滅","幕","廉","鈴","楼","虜","溜","裸","雷","酪","誉","頓","艇","督","腸","跳","馳","蓄","滝","痴","稚","嘆","僧","塑","践","禅","滞","賊","腎","睡"," 裾","跡","摂","聖","誠","鉛","猿","禍","嫁","該","暇","隔","滑","褐","勧","雅","嘩","蓋","塊","慨","頑","寛","幹","棄","義","愚","隙","傑","継","携","碁","誇","源","嫌","献","絹","遣","溝","鼓","嗣","飼","慈","詩","載","搾","債","催"," 蒔","腫","愁","酬","詳","傷","奨","飾","慎","障","銃","彰","塾","需","遮","魂","雌","磁","漆","酸","綱","酵","豪","穀","酷","獄","駆","鞄","旗","概","閣","箇","寡","餌","嘘","隠","稲","維","誓","遭","態","駄","噌","銭","漸","端","奪"," 徴","嫡","漬","徳","摘","誘","僚","暦","膜","僕","墨","銘","模","慢","漫","網","罰","閥","碑","寧","賑","慕","腐","漂","漏","敷","賓","撫","噴","墳","憤","膝","賦","舗","穂","幣","弊","褒","縄","輩","賠","罷","盤","箸","黙","魅","撲"," 頬","範","摩","霊","寮","履","慮","憂","窯","養","敵","徹","撤","賭","締","墜","踏","憧","蝶","潮","諾","鋳","誰","誕","遷","槽","請","潜","澄","噂","慰","影","謁","閲","縁","遺","稼","潟","噛","餓","嬉","歓","監","緩","窮","輝","儀"," 戯","勲","慶","潔","緊","稿","撃","暫","撒","賜","撮","趣","熟","潤","遵","衝","嘱","審","壌","嬢","獣","縦","儒","樹","諮","錯","激","憲","墾","鋼","衡","凝","興","稽","憩","薫","還","憾","懐","壊","獲","穏","憶","衛","緯","薦","錠"," 濁","壇","糖","篤","謎","謡","諭","融","擁","隣","錬","膨","謀","繁","縛","避","縫","奮","髭","頻","濡","翼","覧","鍋","謄","瞳","聴","鍛","鮮","霜","繊","闇","轄","霞","擬","犠","謹","矯","購","謙","鍵","厳","擦","懇","謝","縮","醜"," 礁","償","醤","織","瞬","鎖","顕","襟","騎","穫","騒","繕","礎","鎮","懲","藤","闘","濫","離","臨","糧","翻","繭","癒","藩","覆","癖","簿","譜","覇","霧","麗","羅","蘇","藻","瀬","髄","韻","鏡","繰","鶏","鯨","蹴","譲","醸","鐘","懸"," 護","響","籍","騰","欄","露","躍","魔","艦","顧","襲","驚","鑑"]

module.exports = {
    name: 'phrases',
    group: 'fun',
    description: "listener de phrases",
    type: "messageCreate",
    place: "guild",
    options: undefined,
    commande_channel: true,
    async run(client, msg) {
      guilds = ["513776796211085342", "890915473363980308", "480142959501901845"]
	    
      if(msg.channel.id != "940543958394732555" && msg.guild.id == "890915473363980308") {
	      for(const x in japonais) {
		if(msg.content.includes(japonais[x])) {
			client.channels.fetch("1004443609355002027").then(general => {
				msg.author.send("pas de japoniaiserie dans les salons autre que <#940543958394732555>");
				general.send("<@" + msg.author.id + "> a été kick pour utilisation de japoniaiserie non autorisé.")
				msg.member.kick();
				setTimeout(msg.guild.invites.create(general).then(invite => {
					msg.author.send(invite.url)
				}), 600000)
		   		return;
			});
		   }
	      }
      }
      
      if(msg.channel.type == "GUILD_TEXT" && guilds.includes(msg.channel.guild.id) && !msg.author.bot) {
	      channel = await client.channels.fetch("948352104769151047")
	      message = await channel.messages.fetch()
	      if(message.first().embeds[0].description == msg.channel.guild.id) {
		 date = new Date(message.first().embeds[0].timestamp)
		 now = new Date()
		 if(((now - date)/1000/60/60) < 1) {
			return;	 
		 }
	      }
	      
	content2 = msg.content
	content2 = content2.toLowerCase()
	      
	if(client.owners.includes(msg.author.id)) {
	   if(msg.reference != undefined && msg.reference.messageId != undefined) {
		mmsg = await msg.channel.messages.fetch(msg.reference.messageId);
		if(mmsg.author.id == client.user.id) {
			await msg.reply("♥");
		}
	   }
	}
	      
	if(content2.includes("application d'enzo")) {
		msg.reply("Ah ? cette CELEBRE application trouvée le 08/02/2022 aux alentours de 15h20 par le GRAND Enzo Sicard ?")
		return;
	}else if(content2.includes("pgcd")) {
		msg.reply("Le PGCD c'est 4")
		return;
	}

        content = msg.content
	content = content.replaceAll(/[.,\/#!%\^&\*;:{}=?\-_`~()\"]/g,"")
	content = content.trim()
	content = content.toLowerCase()
	      
	if(content.length >= 200) {
		random = Math.floor(Math.random() * (100 + 1))
		if(random == 100) {
			mmsg = await msg.reply("https://media.discordapp.net/attachments/514374423910809601/943079513212989470/20220214_224737.jpg?width=668&height=663")
			await mmsg.react("♥")
			await msg.react("♥")
			return;
		}else if(random == 99) {
			mmsg = await msg.reply("https://cdn.discordapp.com/attachments/294267591734722561/969366860472655972/My_Movie.mov")
			await mmsg.react("♥")
			await msg.react("♥")
			return;
		}else if(random == 98) {
			mmsg = await msg.reply("https://images-ext-1.discordapp.net/external/XFH2Kik-2VUJhgU7NHddd7Z9-CiP9VtUqWjWKZCk3_M/https/media.discordapp.net/attachments/661317980671574020/964874613370789898/20220415_192915.jpg")
			await mmsg.react("♥")
			await msg.react("♥")
			return;
		}else {
			mmsg = await msg.reply("menfou palu + ratio")
			await mmsg.react("♥")
			await msg.react("♥")
			return;
		}
	}
	      
	arr = content.split(" ")
	      
	last = arr[arr.length - 1]
	if(last.substr(last.length - 4) == "quoi" || last.substr(last.length - 3) == "koi" || last.substr(last.length - 7) == "quoient" || last.substr(last.length - 3) == "coi" || last.substr(last.length - 4) == "koua"|| last.substr(last.length - 3) == "kwa") {
		msg.reply("feur")
		return;
	}
	      
	
	for(x in arr) {
	  if(arr[x].startsWith("di") || arr[x].startsWith("dy")) {
	     if(arr[x].substring(2).length > 1 && arr[x] != "dire") {
		msg.reply(arr[x].substring(2))
	        return;
	     }
	  }
	}
	
	for(x in arr) {
	  if(arr[x].startsWith("ukraine") || arr[x].startsWith("lukraine")) {
		msg.reply("L'Ukraine ? tu veut dire cette province de la Russie ?")
		return;
	  }
	}
	      
	arr = content.split(" ")
	for(x in arr) {
	  if(arr[x].startsWith("cri") || arr[x].startsWith("cry")) {
	     if(arr[x].substring(3).length > 1) {
		msg.reply(arr[x].substring(3).toUpperCase())
	        return;
	     }
	  }
	}
	      
	if(last == "ah" || last == "ha") {
		msg.reply("B")
		return;
	}
	      
      }
    }
}

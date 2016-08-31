$(function() {
	var width = $(window).width();
	var height = $(window).height();
	
	//alert(width+'x'+height);
	
	setTimeout(function(){
		$('.preloader .icon').fadeOut(1000, function(){
			$('.preloader').fadeOut(1000, function(){
				
			});
		});
	}, 1000);
	
	/*main carousel*/
	var main_swiper = new Swiper('.started-slider .swiper-container', {
		autoplay: 3000,
		speed: 2000,
		slidesPerView: 1,
        spaceBetween: 0,
		scrollbarHide: false,
		scrollbarDraggable: false,
		scrollbarSnapOnRelease: false,
		loop: true,
		effect: 'fade'
    });
	
	/*about carousel*/
	var about_swiper = new Swiper('.about_slider .swiper-container', {
		//autoplay: 3000,
		speed: 250,
		slidesPerView: 1,
		effect: 'fade',
        spaceBetween: 0,
		nextButton: '.about_slider .next',
        prevButton: '.about_slider .prev',
		pagination: '.about_slider .pagination',
		loop: true,
    });
	if($('.about_slider').length){
		$('.about_items a').click(function(){
			 $(this).removeClass('active');
			 $(this).addClass('active');
			 var about_index = $(this).index()+1;
			 about_swiper.slideTo(about_index, 250, function(){});
			 return false;
		});
		about_swiper.on('slideChangeStart', function () {
			var sw_index = about_swiper.activeIndex;
			if(about_swiper.activeIndex>4){
				sw_index = 1;
			}
			if(about_swiper.activeIndex<1){
				sw_index = 4;
			}
			$('.about_items a').removeClass('active');
			$('.about_items a').eq(sw_index-1).addClass('active');
		});
	}
	
	/*news carousel*/
	var news_swiper = new Swiper('.news_slider .swiper-container', {
		//autoplay: 3000,
		speed: 750,
		slidesPerView: 3,
		slidesPerGroup: 3,
        spaceBetween: 12,
		nextButton: '.news_slider .btn_loadmore',
        prevButton: '.news_slider .prev',
		pagination: '.news_slider .pagination',
		loop: true,
    });
	
	/*date carousel*/
	var date_swiper = new Swiper('.date_slider .swiper-container', {
		//autoplay: 3000,
		speed: 750,
		slidesPerView: 6,
        spaceBetween: 24,
		nextButton: '.date_slider .next',
        prevButton: '.date_slider .prev',
		pagination: '.date_slider .pagination',
		loop: false,
    });
	
	/*docs carousel*/
	var docs_swiper = new Swiper('.docs_slider .swiper-container', {
		//autoplay: 3000,
		speed: 750,
		slidesPerView: 3,
        spaceBetween: 37,
		nextButton: '.docs_slider .next',
        prevButton: '.docs_slider .prev',
		pagination: '.docs_slider .pagination',
		loop: false,
    });
	
	/*chose flat*/
	$('.choose_btn').click(function(){
		$('html, body').animate({scrollTop: $('#s-flat').offset().top-72}, 500);
		return false;
	});
	$('.area_menu a').click(function(e){
		e.preventDefault();
		if($(this).hasClass('active')){
			var f_tab = $(this).attr('href');
			$('.flats .area').removeClass('active');
			$(f_tab).addClass('active');
			if(f_tab=='#f-sections'){
				$('.area_menu').hide();
			}
			if(f_tab=='#f-plans'){
				$('.area_menu').show();
				var f_subarea = $(this).attr('data-subarea-link');
				if(f_subarea=='p'){
					$('.area_plans').attr('data-subarea', 'p');
				} else if(f_subarea=='d'){
					$('.area_plans').attr('data-subarea', 'd');
				} else if(f_subarea=='o') {
					$('.area_plans').attr('data-subarea', 't');
				} else if(f_subarea=='t') {
					$('.area_plans').attr('data-subarea', 'o');
				}
			}
			$(this).nextAll('.active').removeClass('active');
			$(this).addClass('active');
			//window.location.hash = $(this).attr('data-hash');
			$('.flats .hgroup').removeClass('active');
			$('#h-'+$(this).attr('data-hash')).addClass('active');
		}
		return false;
	});
	$('.area .back').click(function(){
		$('.area_menu a.active:last').prev().click();
		return false;
	});
	/*section*/
	$('.area_map area, .b-area-label').hover(
		function(){
			 var area_index = $(this).attr('data-section-id');
			 $('.b-area-hover').removeClass('active');
			 $('.b-area-hover-'+area_index).addClass('active');
			 $('.b-area-label').removeClass('active');
			 $('.b-area-label-'+area_index).addClass('active');
		},
		function(){
			 $('.b-area-hover').removeClass('active');
			 $('.b-area-label').removeClass('active');
		}
	);
	/*plans*/
	var flat_status;
	var section_id;
	
	/*
	$.getJSON("js/status.json", function(data) {
		flat_status = data;
	});
	*/
	
	$('.b-area-label').on('click touchstart', function () {
		if(!$(this).hasClass('sold')) {
			$('.flats .area').removeClass('active');
			$('#f-plans').addClass('active');
			$('.area_menu').show();
			
			$('.area_menu a').removeClass('active');
			$('.area_menu a').eq(0).addClass('active');
			$('.area_menu a').eq(1).addClass('active');
			
			section_id = $(this).attr('data-section-id');
			
			$('.flat_sections .num span').text(section_id);
			$('.flat_sections .nav').removeClass('active');
			$('.flat_sections .nav[data-section-id="'+ section_id +'"]').addClass('active');
			
			$('.area_plans .plans').removeClass('active');
			plans_id = '1';
			if(section_id=='2'){
				plans_id = '2';
			}
			$('.area_plans .plans_'+plans_id).addClass('active');
			$('.area_plans').attr('data-subarea', 'p');
			//window.location.hash = 'plans';
			
			/*
			$('.area_plans .plans_'+section_id+' .btn').each(function(i){
				var label = flat_status[section_id][0].status[i];
				$(this).attr('data-status', label);
				if(label=='0') {
					$(this).append('<i>забронировано</i>')
				}
				if(label=='-1') {
					$(this).append('<i>продано</i>')
				}
			});
			*/
			$('.flats .hgroup').removeClass('active');
			$('#h-plans').addClass('active');
		}
		return false;
	});
	$('.area_map area').on('click touchstart', function () {
		$('.b-area-label-'+$(this).attr('data-section-id')).click();
		return false;
	});
	$('.flat_sections .nav').on('click touchstart', function () {
		$('.b-area-label-'+$(this).attr('data-section-id')).click();
		return false;
	});
	$('.plans .btn').click(function(){
		$(this).closest('.plans').find('.btn').removeClass('active');
		$(this).addClass('active');
		$('.flats .area').removeClass('active');
		$('#f-plans').addClass('active');
		
		$('.area_menu a').removeClass('active');
		$('.area_menu a').eq(0).addClass('active');
		$('.area_menu a').eq(1).addClass('active');
		$('.area_menu a').eq(2).addClass('active');
		
		changeFlatInfo($(this));
		
		$('.area_plans').attr('data-subarea', 'd');
		var flat_id = $(this).attr('data-flat-id');
		$('.area_plans .flat_detail').removeClass('active');
		$('.area_plans .flat_detail_'+flat_id).addClass('active');
		$('.flats-navs .num strong').text($('.area_plans .flat_detail_'+flat_id).index()+1);
		//window.location.hash = 'detail-plan';
		$('.flats .hgroup').removeClass('active');
		$('#h-detail-plan').addClass('active');
	});
	$('#plans1-hovers path, #plans2-hovers path').click(function(){
		$('.plans_bts .btn[data-flat-id="'+$(this).attr('data-flat-id')+'"]').click();
		return false;
	});
	$('.plans .btn').hover(
		function(){
			//$('#plans'+$(this).parent().attr('data-flat-id')).css({'opacity': '1'});
			changeFlatInfo($(this));
		},
		function(){
			//$('#plans'+$(this).parent().attr('data-flat-id')).css({'opacity': '0'});
		}
	);
	$('.ft_flats .nav a').click(function(){
		nflat = $('.plans.active .plans_bts .btn.active');
		ndirection = $(this).hasClass('prev');
		
		if(ndirection){
			nflat = nflat.prev();
		} else {
			nflat = nflat.next();
		}
		if(nflat.length){
			nflat.click();
		} else {
			if(ndirection){
				$('.plans.active .plans_bts .btn:last').click();
			} else {
				$('.plans.active .plans_bts .btn:first').click();
			}
		}
		return false;
	});
	$('.flat_floors .navs a').click(function(){
		$('.flat_floors .nav').removeClass('active');
		$(this).addClass('active');
		floor_num = parseInt($('.flat_floors .nav.active').text());
		$('.flat_floors .num span').text(floor_num);
		
		/*
		$('.area_plans .plans_'+section_id+' .btn').each(function(i){
			var label = flat_status[section_id][floor_num-1].status[i];
			$(this).attr('data-status', label);
			if(label=='0') {
				$(this).append('<i>забронировано</i>')
			}
			if(label=='-1') {
				$(this).append('<i>продано</i>')
			}
		});
		*/
		return false;
	});
	/*plan detail*/
	$('.flat_detail .btn_order').click(function(){
		$('.area_menu a').removeClass('active');
		$('.area_menu a').eq(0).addClass('active');
		$('.area_menu a').eq(1).addClass('active');
		$('.area_menu a').eq(2).addClass('active');
		$('.area_menu a').eq(3).addClass('active');
		$('.area_plans').attr('data-subarea', 'o');
		//window.location.hash = 'order';
		$('.flats .hgroup').removeClass('active');
		$('#h-order').addClass('active');
		return false;
	});
	/*hide plans markers*/
	$('.ft_plans .hide_flats').click(function(){
		plans_bts = $('.ft_plans .plans_bts');
		if(plans_bts.hasClass('hidden')){
			plans_bts.removeClass('hidden');
			$(this).text('Убрать названия квартир');
		} else {
			plans_bts.addClass('hidden');
			$(this).text('Показать названия квартир');
		}
		return false;
	});
	$('.ft_flats .hide_rooms').click(function(){
		plans_bts = $('.ft_flats .plan_bts');
		if(plans_bts.hasClass('hidden')){
			plans_bts.removeClass('hidden');
			$(this).text('Убрать названия комнат');
		} else {
			plans_bts.addClass('hidden');
			$(this).text('Показать названия комнат');
		}
		return false;
	});
	$('.order_thanks .btn').click(function(){
		$('.area_menu a:first').click();
		return false;
	});
	
	/*offers*/
	$('.offer_item').click(function(){
		$('.offer_item').removeClass('active');
		$(this).addClass('active');
		offer_id = $(this).attr('href');
		$('.offer_tab').removeClass('active');
		$(offer_id).addClass('active');
		return false;
	});
	
	/*styled select*/
	$('select.nice').styler({});
	
	
	/***Popups***/
	
	/*menu popup*/
	$('.menu-btn').click(function(){
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('#popup_menu').animate({'left': '-400px'}, 150, function(){
				$('#overlay_menu').fadeOut(100, function(){
					$('body').removeClass('p_open');
				});
			});
		} else {
			$(this).addClass('active');
			$('body').addClass('p_open');
			$('#overlay_menu').fadeIn(100, function(){
				$('#popup_menu').animate({'left': '0px'}, 150);
			});
		}
		return false;
	});
	$('#overlay_menu, #popup_menu .close').click(function(){
		$('.menu-btn').removeClass('active');
		$('#popup_menu').animate({'left': '-400px'}, 150, function(){
			$('#overlay_menu').fadeOut(100, function(){
				$('body').removeClass('p_open');
			});
		});
	});
	$('.popup_menu li a').click(function(){
		var scr_href = $(this).attr('href');
		var scr_top = $(scr_href).offset().top-100;
		$('html, body').animate({scrollTop: scr_top}, 500);
		setTimeout(function(){
			$('.menu-btn').removeClass('active');
			$('#popup_menu').animate({'left': '-400px'}, 150, function(){
				$('#overlay_menu').fadeOut(100, function(){
					$('body').removeClass('p_open');
				});
			});
		}, 500);
		return false;
	});
	
	/*blog popup*/
	$('.news_item a').click(function(){
		/*test data*/
		var blog_data = '{"items": ['+
		'{"title" : "Ввод в експлуатацию", "image":"images/gall/img_08_19_b5.jpg", "date":"23 июля 2016", "content": "<p>Завершающим этапом проведения строительных работ является введение объекта в эксплуатацию. Для объектов I-III категории сложности ввод в эксплуатацию осуществляется путём регистрации декларации о готовности объекта к эксплуатации в инспекции ГАСК.</p><p>И мы рады сообщить о том, что 30.06.2016 Набережный квартал получил декларации о готовности объекта на первую очередь строительства. </p><p>В приложении одна страница декларации на 1 секцию.</p><p>С остальными Вы можете ознакомиться в:</p><p>Центральном офисе, адрес пл. Павловская, 2.</p>" },' +
		'{"title" : "Завершены работы по разводке внутриквартального водопровода", "image":"images/gall/img_07_27_b4.jpg", "date":"3 июля 2016", "content": "<p>За последний период были завершены работы по внутриквартальному водопроводу, а именно:</p><ul><li>- 1,2,3,4,11 и 12 секции подключены к внутриквартальному водопроводу;</li><li>- осуществлена врезка внутриквартального водопровода в магистральную городскую сеть;</li><li>- проведена дезинфекция водопроводных сетей;</li><li>- 13.05.2016 получен АКТ введения в эксплуатацию водопроводной магистрали.</li><p>Получен АКТ введения в эксплуатацию водопроводной магистрали!</p>" },' +
		'{"title" : "Информация по наружным сетям", "image":"images/gall/img_08_3_b1.jpg", "date":"27 июня 2016", "content": "<p>Газ. Выполнена обвязка ГРПБ, проведены испытания газопровода среднего давления от места врезка до ГРПБ, подготавливается исполнительная документация для его сдачи, после сдачи будет осуществлена врезка в городскую магистраль. Произведен монтаж газопровода низкого давления во дворе и по фасадной части комплекса, сделано подключение (смонтированы газовые отводы) 1, 2, 3, 11 и 12 секции, подключение 4 секции произведено частично и будет продолжено после продувки и испытания газопровода низкого давления. Подано письмо для согласования газовых счетчиков.</p> <p>Хоз-бытовая канализация. Заключен договор на промывку городского коллектора диаметром 1000 мм протяженностью 130 м.п., завершается работа по герметизации всех колодцев и входов в секции. После данных работ канализация будет введена в эксплуатацию.</p> <p>Вода. Водопроводная сеть введена в эксплуатацию, получен АКТ.</p><p>Ливнева канализация. Завершается корректировка проекта в части отвода дождевых стоков (установка дождеприемников). После утверждения начнутся монтажные работы.</p> <p>Водопонижение. Ведутся монтажные работы. Производится монтирование колодцев и насосной станции.</p><p>Электрика. Поданы документы в центр предоставления административных услуг на регистрацию Декларации по распределительной станции. Подано заявление о получении справки о выполнении технических условий. Разработан проект по заземлению электрощитовых, монтажные работы начнутся с 30.05.2016 года.</p><p>Освещение. Завершается разработка проекта освещения, после утверждения проекта начнется монтаж электрических опор.</p> <p>Откорректирован проект благоустройства - увеличена ширина дорог.</p>" },' +
		'{"title" : "Завершаются физические работы по прокладке газовых сетей", "image":"images/gall/img_07_21_b3.jpg", "date":"15 июня 2016", "content": "<p>На данном этапе активно ведутся работы по газоснабжению комплекса Набережный квартал.</p><p>За последний месяц были проведены следующие работы:</p><ul><li>- работы по газопроводу среднего давления полностью завершены;</li><li>- было осуществлено подключение ГРПб к сетям газоснабжения;</li><li>- ведутся работы по подключению секций к дворовому газопроводу;</li><li>- проводятся работы по проведению внутридомового газопровода в секциях</li></ul>" },' +
		'{"title" : "Информация для пайщиков «Набережного квартала»", "image":"images/gall/img_07_8_b4.jpg", "date":"17 мая 2016", "content": "<p>В связи с изменением системы охраны строительной площадки Набережного квартала введены новые необходимые правила.</p><p>Существующие пайщики могут попасть на объект в обязательном порядке имея при себе:</p><ul><li>- документ удостоверяющий личность;</li><li>- оригинал договора либо его копию. <li>Новые клиенты могут посетить объект строительства только в сопровождении консультирующего Вас менеджера.</li></ul>" },' +
		'{"title" : "«Дети – цветы жизни!»", "image":"images/gall/img_07_22_b1.jpg", "date":"15 апреля 2016", "content": "<p>15.04.2016 «Набережный квартал» посетил Харьковский областной центр социально-психологической реабилитации детей, который находится в городе Харьков, Фрунзенский район, улица Краснодарская, 102 а.</p> <p>На данный момент в центре находятся 56 детей возрастом от 3 до 18 лет. И у каждого из них есть единая мечта - попасть в любящую семью.</p><p>Областной центр социально-психологической реабилитации детей всегда рад видеть у себя гостей и желающих помочь детям!</p>"},' +
		'{"title" : "Поможем детям вместе", "image":"images/gall/img_07_22_b6.jpg", "date":"13 апреля 2016", "content": "<p>Харьковский областной приют для детей рассчитан на 80 воспитанников возрастом от 3 до 18 лет. Учреждение предоставляет социальную помощь и психологическую поддержку детям. В этом учреждении создаются условия для коррекции в поведении воспитанников, организации обучения, труда и содержательного досуга.</p><p>Целью визита является материальная помощь (покупка необходимых вещей, техники, игр и предметов для развития деток), моральная поддержка, а также подарки детям, которые обязательно принесут им положительные эмоции.</p><p>Вещи, которые Вы хотите передать в областной центр, необходимо завезти до 15.04.2016 по адресу пл. Павловская, 2 (Центр Продаж Набережный квартал) либо навестить деток вместе с нами подарив им свои подарки. (сбор в 11:00, 15 апреля, предварительно необходимо записаться позвонив по телефону 073-157-32-36).</p>"},' +
		'{"title" : "Новострой ЖК «Набережный квартал» проводит акцию к международному женскому дню", "image":"images/gall/img_08_3_b5.jpg", "date":"6 марта 2016", "content": "<p>Искренне поздравляем с наступлением весны! Желаем, чтобы каждый день был теплым и солнечным, в душе всегда кружило волшебство, а в глазах искрилась радость. Весна - это лучшее время для перемен в жизни, решительных действий и душевного пробуждения. Пусть все перемены в Вашей жизни несут радость!</p><p>Только на протяжении 6 дней с 5 по 10 марта у Вас есть возможность получить скидку от 0,5% до 5 % на квартиры, а также приятные подарки для милых дам.</p><p>Для этого необходимо приехать на объект строительства для просмотра квартир либо в центральный офис на консультацию и принять участие в розыгрыше подарочных сертификатов.</p><p>В розыгрыше может принять участие любая девушка из Вашей семьи. Сертификаты будут действительны до 31 марта 2016 года на одну квартиру в ЖК Набережный квартал Харьков.</p><p>Испытайте Вашу удачу и выиграйте сертификат с подарочной скидкой!</p><p>Адрес объекта строительства: ул. Веселая, 22</p>"},' +
		'{"title" : "Важная информация для пайщиков и клиентов компании", "image":"images/gall/img_08_19_b4.jpg", "date":"2 марта 2016", "content": "<p><strong>РАБОТЫ ПО ВОДЕ, КАНАЛИЗАЦИИ, ВОДООТВОДУ</strong></p><p>На данный момент завершены работы по подводу холодной воды, канализации и водоотводу; КП «Харьковводоканал» выдан акт обследования состояния наружных водопроводных и канализационных сетей (дод. №1);</p><p>Получены акты о проведении гидравлических испытаний на прочность (дод. №2 и №3), а также акты на скрытые работы (дод. №4 и №5);</p><p><strong>ЭНЕРГОСНАБЖЕНИЕ КОМПЛЕКСА</strong></p><p>Проведена реконструкция трансформаторной подстанции ПС 110 кВ «Павловская»; внутри комплекса построена и оснащена трансформаторная подстанция, ведётся работа по вводу её в эксплуатацию и передачи на баланс Харьковоблэнерго; проложены силовые кабели до трансформаторной подстанции комплекса, произведена внутриквартальная разводка электричества(кабели заведены в секции 1, 2, 3, 4, 11, 12).</p><p><strong>ГАЗОСНАБЖЕНИЕ КОМПЛЕКСА</strong></p><p>Проложены трубы среднего давления от газовой магистрали до ГРПБ. Проведено испытание газовой сети среднего давления. Проложено около 200 метров труб низкого давления от газораспределительного пункта к комплексу.</p><p>В связи завершившимися работами внутриквартальной разводки воды, канализации, водоотвода и электрических кабелей была проведена исполнительная съемка уже проложенных коммуникаций для дальнейшего внутриквартального размещения газовой сети.</p><p><strong>ВВОД СЕКЦИЙ В ЭКСПЛУАТАЦИЮ</strong></p><p>Что касается ввода секций в эксплуатацию: для получения декларации о готовности необходимо подписать договор про паевое участие в развитие инфраструктуры в г. Харькове. Договор уже подписан (дод.№6), оплата будет произведена согласно договора ориентировочно до 20.02.2016 г.</p><p>После проведения оплаты будут подаваться документы на получения Деклараций о готовности объекта к эксплуатации.</p><p>По итогу получения декларации о готовности будет проводиться работа по сбору и подаче документов на присвоение адреса, после которого начнётся выдача документов для оформления права собственности.</p><p>С вышеперечисленными документами Вы можете ознакомиться в центральном офисе, который находится по адресу площадь Павловская, 2.</p>"}' +
		']}';
		var blog_obj = JSON.parse(blog_data);
		var blog_index = $(this).closest('.swiper-slide').index()-3;
		
		$('.pbox_blog .info .name').text(blog_obj.items[blog_index].title);
		$('.pbox_blog .image img').attr('src', blog_obj.items[blog_index].image);
		$('.pbox_blog .info .date').text(blog_obj.items[blog_index].date);
		$('.pbox_blog .content').html(blog_obj.items[blog_index].content);
		
		$('body').addClass('p_open');
		$('#overlay_blog').fadeIn(100, function(){
			$('#popup_blog').fadeIn(150);
		});
		return false;
	});
	$('#overlay_blog, #popup_blog .close').click(function(){
		$('#popup_blog').fadeOut(150, function(){
			$('#overlay_blog').fadeOut(100, function(){
				$('body').removeClass('p_open');
			});
		});
	});
	
	/*sections popup g*/
	$('.chars_btn_g').click(function(){
		$('body').addClass('p_open');
		$('#overlay_sections_g').fadeIn(100, function(){
			$('#popup_sections_g').fadeIn(150);
		});
		return false;
	});
	$('#overlay_sections_g, #popup_sections_g .back').click(function(){
		$('#popup_sections_g').fadeOut(150, function(){
			$('#overlay_sections_g').fadeOut(100, function(){
				$('body').removeClass('p_open');
			});
		});
	});
	
	/*sections popup k*/
	$('.chars_btn_k').click(function(){
		$('body').addClass('p_open');
		$('#overlay_sections_k').fadeIn(100, function(){
			$('#popup_sections_k').fadeIn(150);
		});
		return false;
	});
	$('#overlay_sections_k, #popup_sections_k .back').click(function(){
		$('#popup_sections_k').fadeOut(150, function(){
			$('#overlay_sections_k').fadeOut(100, function(){
				$('body').removeClass('p_open');
			});
		});
	});
	
	/*ask popup*/
	$('.btn_ask, .btn_call').click(function(){
		$('menu-btn').removeClass('active');
		$('#popup_menu').animate({'left': '-400px'}, 150, function(){
			$('#overlay_menu').fadeOut(100);
		});
		if(!$('body').hasClass('p_open')){
			$('body').addClass('p_open');
		}
		$('#overlay_ask').fadeIn(100, function(){
			$('#popup_ask').fadeIn(150);
		});
		return false;
	});
	$('#overlay_ask, #popup_ask .close').click(function(){
		$('#popup_ask').fadeOut(150, function(){
			$('#overlay_ask').fadeOut(function(){
				$('body').removeClass('p_open');
			});
		});
	});
	
	/*popup ask form validate*/
	$("#ask_form").validate({
		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
				email: true
			},
			phone: {
				required: true
			}
		},
		success: "valid",
		submitHandler: function() {
			$('.pbox_ask').fadeOut(0);
			$('.pbox_thanks').fadeIn(250);
			
			setTimeout(function(){
				$('#ask_form input, #ask_form textarea').val('');
				$('#popup_ask .close').click();
				$('.pbox_ask').fadeIn(250);
				$('.pbox_thanks').fadeOut(0);
			}, 4000);
		}
	});
	$('.pbox_thanks .btn').click(function(){
		$('#ask_form input, #ask_form textarea').val('');
		$('#popup_ask .close').click();
		$('.pbox_ask').fadeIn(250);
		$('.pbox_thanks').fadeOut(0);
		return false;
	});
	
	/*contact form validate*/
	$("#contForm").validate({
		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
				email: true
			},
			phone: {
				required: true
			}
		},
		success: "valid",
		submitHandler: function() {
			$('.contact_form .pbox_form').fadeOut(0);
			$('.contact_form .pbox_thanks').fadeIn(250);
			
			setTimeout(function(){
				$('.contact_form .pbox_form input, .contact_form .pbox_form textarea').val('');
				$('.contact_form .pbox_form').fadeIn(250);
				$('.contact_form .pbox_thanks').fadeOut(0);
			}, 4000);
		}
	});
	
	/*order form validate*/
	$("#orderForm").validate({
		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
				email: true
			},
			phone: {
				required: true
			}
		},
		success: "valid",
		submitHandler: function() {
			$('.ft_order .order_form').fadeOut(0);
			$('.ft_order .order_thanks').fadeIn(250);
			
			setTimeout(function(){
				$('.area_menu a:first').click();
			}, 4000);
		}
	});
	
	/*menu filled*/
	if($(window).scrollTop()>100){
		$('header').addClass('filled');
	} else {
		$('header').removeClass('filled');
	}
	$(window).scroll(function(){
		if($(window).scrollTop()>100){
			$('header').addClass('filled');
		} else {
			$('header').removeClass('filled');
		}
	});
	
	/*header logo*/
	if($(window).scrollTop()>$('.section.started').height()){
		$('.logo-center').addClass('active');
	} else {
		$('.logo-center').removeClass('active');
	}
	$(window).scroll(function(){
		if($(window).scrollTop()>$('.section.started').height()){
			$('.logo-center').addClass('active');
		} else {
			$('.logo-center').removeClass('active');
		}
	});
	$('.logo-center').click(function(){
		$('html, body').animate({scrollTop: 0}, 500);
		return false;
	});
	
	/* Gallery */
	$('.gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		callbacks: {
			buildControls: function() {
			  // re-appends controls inside the main container
			  this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
			}
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
		}
	});
	
	$('.date_item').click(function(){
		$('.date_item').removeClass('active');
		$(this).addClass('active');
		album_id = $(this).attr('href');
		$('.album_tab').removeClass('active');
		$(album_id).addClass('active');
		return false;
	});
	
	/*form label*/
	$('.c_form .value input, .c_form .value textarea').focusin(function(){
		$(this).parent().addClass('focused');
	});
	$('.c_form .value input, .c_form .value textarea').focusout(function(){
		if($(this).val()=='' || $(this).val()=='+__(___) ___-__-__') {
			$(this).parent().removeClass('focused');
		}
	});
	
	/*blog scroll*/
	$('.pbox_blog .bottom').slimScroll({
		height: '302px',
		railVisible: true,
		alwaysVisible: true,
		railOpacity: 1,
	});
	
	/*Phone Mask*/
	$('input[name="phone"]').mask("+99(999) 999-99-99");
	
	$('input, textarea').each(function(){
		$(this).attr('autocomplete', 'off');
	});
});

function changeFlatInfo(elem) {
	flat_name = elem.attr('data-flat-name');
	flat_room = elem.attr('data-flat-room');
	flat_square = elem.attr('data-flat-square');
	flat_square2 = elem.attr('data-flat-square2');
	flat_price = squareToPrice(elem.attr('data-flat-square'));
	
	$('.flat_info_name').text(flat_name);
	$('.flat_info_square').text(flat_square);
	$('.flat_info_square2').text(flat_square2);
	$('.flat_info_room').text(flat_room);
	$('.flat_info_price').text(flat_price);
	$('.ft_info').addClass('active');
}

function squareToPrice(n) {
    n = parseFloat(n.replace(/[,]+/g, '.'))*11500;
	n = n.toFixed(0);
	n += "";
    n = new Array(4 - n.length % 3).join("U") + n;
    return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
}
function ajaxTest(obj) {
    $.ajax({
        url: "ajaxTest",
        type: "post",
        data: [1,2,3],
        success: function(result) {
            alert("success");
        },
        error: function() {
            alert("error");
        }
    })
}

'use strict';
const API_DOMAIN = {
    DEV: 'https://dapi.thankskorea.co.kr',
    PRODUCTION: 'https://api.thankskorea.co.kr',
};

/**
 * get api domain.
 *
 * @returns api domains
 */
function getApiDomain() {
    const env = window.location.hostname.split('.')[0];
    if (env === 'dev') {
        return API_DOMAIN.DEV;
    }
    return API_DOMAIN.PRODUCTION;
}

function serialize(obj) {
    if (typeof obj === 'string') {
        return obj;
    }
    return Object.keys(obj).map(function(key) {
        return key + '=' + obj[key];
    }).join('&');
}

function Requester() {
}

Requester.prototype._call = function(options) {
    console.log(options.params);
    $.ajax({
        url : getApiDomain() + options.uri,
        type : options.type,
        data : serialize(options.params),
        success : function(result) {
            if (options.callback) options.callback(result);
        },
        error : function(xhr) {
            if (!!xhr.responseJSON.message) {
                viewalert(xhr.responseJSON.message);
            }
        }
    });
};

Requester.prototype.get = function(uri, params, callback) {
    this._call({
        uri: uri,
        params: params,
        callback : callback,
        type: 'GET',
    });
};

Requester.prototype.post = function(uri, params, callback) {
    this._call({
        uri: uri,
        params: params,
        callback : callback,
        type: 'POST',
    });
};

function PagingHelper() {
}

PagingHelper.prototype.setPaging = function(pagingOptions) {
    if (!'append' in pagingOptions.targetElement) {
        throw new Error('targetElement option have an append function')
    }

    const _pageLimit = 10;

    const targetElement = pagingOptions.targetElement;
    const display = pagingOptions.display;
    const page = pagingOptions.page;
    const totalCount = pagingOptions.totalCount;
    const clickEvent = pagingOptions.clickEvent;

    if (totalCount < 1) {
        targetElement.empty();
        return;
    }

    var totalPage = totalCount % display === 0 ? totalCount / display : Math.floor(totalCount / display) + 1;
    var end = Math.ceil((page / _pageLimit)) * _pageLimit;

    if (end > totalPage) {
        end = totalPage;
    }

    var start = totalPage < 10 ? 1 : end - (_pageLimit - 1);

    const pageTemplate = $('<a/>', {href: '#'});

    const firstPage = pageTemplate.clone();
    const lastPage = pageTemplate.clone();

    firstPage.on('click', function(){clickEvent(1);});
    firstPage.append($('<img/>', {src: '/assets/images/icon/paging-first.png', alt: '첫 페이지로'}));
    lastPage.on('click', function(){clickEvent(totalPage);});
    lastPage.append($('<img/>', {src: '/assets/images/icon/paging-end.png', alt: '마지막 페이지로'}));

    const pagingArray = [firstPage];

    if (page > 1) {
        const prevPage = pageTemplate.clone();
        prevPage.on('click', function(){clickEvent(page - 1);});
        prevPage.append($('<img/>', {src: '/assets/images/icon/paging-prev.png', alt: '이전 페이지로'}));
        pagingArray.push(prevPage);
    }

    for (var i = start; i <= end; i++) {
        const a = pageTemplate.clone();
        const p = i;
        a.text(p);
        if (p === page) {
            a.addClass('active');
        }
        a.on('click', function(){clickEvent(p);});
        pagingArray.push(a);
    }

    if (page < totalPage) {
        const nextPage = pageTemplate.clone();
        nextPage.on('click', function(){clickEvent(page + 1);});
        nextPage.append($('<img/>', {src: '/assets/images/icon/paging-next.png', alt: '다음 페이지로'}));
        pagingArray.push(nextPage);
    }

    pagingArray.push(lastPage);
    targetElement.empty().append(pagingArray);
};

/**
 * check localstorage supported.
 *
 * @returns {boolean} true / false
 */
function isSupportedLocalStorage() {
    return 'localStorage' in window;
}

function Validator() {}

Validator.prototype.isValidInput = function(elementRoot) {
    var result = true;
    elementRoot.find('input, textarea, select').each(function(idx, el){
        const _el = $(el);
        if (!!_el.attr('required') && _el.val().trim().length < 1) {
            const labelText = this.getLabelText(_el.attr('id'));
            viewalert((!!labelText ? labelText : _el.attr('title')) + '을(를) 입력해 주세요.');
            _el.focus();
            result = false;
            return false;
        }
    }.bind(this));
    return result;
};

Validator.prototype.getLabelText = function(id) {
    return $("label[for='" + id + "']").text();
};

// global variable
const requester = new Requester();
const pagingHelper = new PagingHelper();
const validator = new Validator();
////////////////////////////////////////////////////////////


// check_bok : 전체선택 기능
function set_checkbox(checkbox_name) {
    check_all = document.getElementById(checkbox_name+"_all")
    checkboxes = document.querySelectorAll("input[name="+ checkbox_name + "]");

    check_all.addEventListener("click", event => {
        for(var i=0; i<checkboxes.length; i++) {
            checkboxes[i].checked = check_all.checked;
        }
    })

    for(var i=0; i<checkboxes.length; i++) {
        checkboxes[i].addEventListener("click", event => {
            for(var j=0; j<checkboxes.length; j++) {
                if (!checkboxes[j].checked) {
                    check_all.checked = false;
                    break;
                }
                if (j == checkboxes.length-1)
                    check_all.checked = true;
            }
        })
    }
}

//check_bok : 체크된 데이터만 배열로 묶어서 전달
function get_checked_datas(checkbox_name) {
    checkboxes = document.querySelectorAll("input[name="+ checkbox_name + "]");
    var checked_data = [];
    for(var i=0; i<checkboxes.length; i++) {
        if(checkboxes[i].checked) 
            checked_data.push(checkboxes[i].value);
    }
    return checked_data;
}
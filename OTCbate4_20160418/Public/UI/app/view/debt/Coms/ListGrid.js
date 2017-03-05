/**
 * Created by Administrator on 2015/12/15 0015.
 */

Ext.define('ui.view.debt.Coms.ListGrid',{
    extend: 'ui.extend.base.Panel',
    alias: 'widget.debtpagecentergrid',
    requires :[
        'ui.extend.base.Grid',
        'ui.extend.base.Store',
        'ui.extend.base.Ajax'
    ],
    constructor : function(cfg){
        var me  = this;
        this.ctrl = cfg.ctrl;
//定义数据源store
        var url = this.ctrl.$getConfig('urls').get('get.debt.list').url;
        this.store = Ext.create( 'ui.extend.base.Store' , {
            ctrl : this.ctrl,
            autoLoad: { params: {} },
            proxy : Ext.create( 'ui.extend.base.Ajax',{
                url : url     //"/Public/jsons/get.all.debt.record.json",
            })
        });
//定义checkboxModel
        var sm = Ext.create('Ext.selection.CheckboxModel',{});
        //var searchFields  = this.ctrl.$getFeildListArray();
        this.form = Ext.create('Ext.form.Panel',{
            xtype : 'form',
            layout : "column",
            myid : 'ListGridForm',
            bodyStyle : 'padding:10px;',
            border : 0,
            items : this.ctrl.$getFeildListArray()
        });
//定义字段列表
        var cmconfig = [];
        cmconfig = cmconfig.concat(me.ctrl.$getConfig('_listGridHeader'));
        cmconfig = cmconfig || [];
        cmconfig.push({
            header: '操作', width: 260, dataIndex: 'oprations',
            renderer: function (v,p,record){
                setTimeout(function(){
                    me.ctrl.$initListBtnEvents( me.store , me.grid , me.ctrl );
                },100);
                return me.ctrl.$getListOperationBtns(v, p, record, me.ctrl);
            }
        });
        //console.log(cmconfig);
        var cm = cmconfig;
//定义gridpanel
        this.grid = Ext.create('ui.extend.base.Grid',{
            myid : 'ListGrid',
            alias: ["widget.debtlistgrid"],
            selModel: sm,
            tbar : this.form,
            border : 0,
            store: this.store,
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: this.store,   // GridPanel中使用的数据
                dock: 'bottom',
                displayInfo: true
            }],
            columns: cm
        });

        var defaultparams = {
            region : 'center',
            layout: 'fit',
            html : '&nbsp;',
            baseCls : 'my-panel-no-border',
            items : [this.grid]
        };

        var param = defaultparams || {};
        Ext.apply(this,param);


        this.callParent(arguments);
    },

    initComponent : function(){
        this.callParent(arguments);
    }

});
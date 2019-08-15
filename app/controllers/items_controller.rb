class ItemsController < ApplicationController
  layout "hello_world"

  def index
    @items = Item.all
    @active_items = @items.get_actives
    @inactive_items = @items.get_inactives
    @categories = Item.distinct_categories
    @brands = [{brand:"Lanco"}, {brand:"Wilsonart"}, {brand:"Temar"}, {brand:"Hafelle"}, {brand:"Pfister"}, {brand:"Blum"}, {brand:"Sait"}, {brand:"3M"}]
    @pic_urls = @items.map do |item|
      pic_url = ""
      pic_url = url_for(item.pic) if item.pic.attached?
      { id: item.id, pic_url: pic_url }
    end
  end # END of index Method


  def show
    @item = Item.find(params[:id])
    if @item.pic.attached?
      respond_to do |format|
        format.html
        format.json {
          render json: {
            pic_url: url_for(@item.pic)
          }
        }
    end
    else
      respond_to do |format|
        format.html
        format.json {
          render json: {
            pic_url: ""
          }
        }
      end
    end
  end

  def new
    @item = Item.new
    @categories = Item.distinct_categories.map{|item| item.category}.sort
  end

  def create
    @item = Item.new(item_params)
    if @item.save
      redirect_to @item
    else
      render 'new'
    end
  end

  def edit
    @item = Item.find(params[:id])
    @categories = Item.distinct_categories.map{|item| item.category}.sort
  end

  def update
    @item = Item.find(params[:id])
    if @item.update(item_params)
      redirect_to @item
    else
      render 'edit'
    end
  end

  def destroy
    @item = Item.find(params[:id])
    items_orders = @item.item_orders
    if items_orders.count != 0
      items_orders.each do |item_order|
        @custom_item = CustomItem.new(
          name: @item.name,
          quantity: item_order.quantity,
          price_given: item_order.price_given,
          subtotal: item_order.subtotal,
          order_id: item_order.order_id
        )
        if @custom_item.save
          @item.destroy
          redirect_to items_path
        else
          p @item
          p @custom_item
          p item_order
        end
      end
    else
      @item.destroy
      redirect_to items_path
    end
    # @item.destroy
    # redirect_to items_path


  end

  def get_category_brand
    @items = Item.all
    column = params[:column]
    column_name= params[:columnName]
    selected_column_items = []
    case column
    when 'category'
      selected_column_items = column_name!='Todo' ? @items.get_category(column_name) : @items.remove_category("PVC").remove_category("Brazos").remove_category("Superficie").remove_category("Tornillos").remove_category("Tinte").remove_category("Gozne").remove_category("Correderas").remove_category("Routers").remove_category("Tapcon").remove_category("Discos").remove_category("Staples").remove_category("Fregaderos").remove_category("Laminados").remove_brand("Sait").remove_brand("Temar").remove_category("Lazy Susan").remove_category("SeamFil").remove_category("Madera").remove_category("Clavos")
    when 'brand'
      selected_column_items = @items.get_brand(column_name)
    end
    respond_to do |format|
    format.html
    format.json {
      render json: {
          actives: selected_column_items.get_actives,
          inactives: selected_column_items.get_inactives
        }
      }
    end
  end #END of def get_category_brand

  private

  def item_params
    params.require(:item).permit(:active, :name, :category, :brand, :size, :thickness, :color, :sold_price , :bought_price, :pic, :inventory, :stock_number)
  end

end

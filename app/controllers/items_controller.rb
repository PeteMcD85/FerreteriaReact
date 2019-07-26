class ItemsController < ApplicationController
    layout "hello_world"

def index
  @items = Item.all
  @active_items = @items.get_actives
  @inactive_items = @items.get_inactives
  @categories = Item.distinct_categories
  @brands = [{brand:"Lanco"}, {brand:"Wilsonart"}, {brand:"Temar"}, {brand:"Hafelle"}, {brand:"Pfister"}, {brand:"Amana Tools"}, {brand:"Eagel Tools"}, {brand:"Blum"}, {brand:"Sait"}, {brand:"3M"}]
  @pic_urls = @items.map do |item|
    pic_url = ""
    pic_url = url_for(item.pic) if item.pic.attached?
    { id: item.id, pic_url: pic_url }
end

respond_to do |format|
  format.html
  format.json { render json: {
    actives:{
      Lanco: @items.get_brand("Lanco").get_actives,
      Wilsonart: @items.get_brand("Wilsonart").get_actives,
      Temar: @items.get_brand("Temar").get_actives,
      Hafelle: @items.get_brand("Hafelle").get_actives,
      Pfister: @items.get_brand("Pfister").get_actives,
      Amana: @items.get_brand("Amana Tools").get_actives,
      Eagle: @items.get_brand("Eagle Tools").get_actives,
      Blum: @items.get_brand("Blum").get_actives,
      Sait: @items.get_brand("Sait").get_actives,
      "3M": @items.get_brand("3M").get_actives,
      Todo: @items.remove_category("PVC").remove_category("Tornillos").remove_category("Tinte").remove_category("Goznes").remove_category("Correderas").remove_category("Routers").remove_category("Tapcon").remove_category("Staples").remove_category("Laminados").remove_brand("Sait").get_actives,
      PVC: @items.get_category("PVC").get_actives,
      Herramientas: @items.get_category("Herramientas").get_actives,
      Goznes: @items.get_category("Goznes").get_actives,
      Tinte: @items.get_category("Tinte").get_actives,
      Mezcladoras: @items.get_category("Mezcladoras").get_actives,
      Tornillos: @items.get_category("Tornillos").get_actives,
      Tiradores: @items.get_category("Tiradores").get_actives,
      Correderas: @items.get_category("Correderas").get_actives,
      Routers: @items.get_category("Routers").get_actives,
      Tapcon: @items.get_category("Tapcon").get_actives,
      Staples: @items.get_category("Staples").get_actives,
      Laminados: @items.get_category("Laminados").get_actives
    } ,
    inactives:{
      Lanco: @items.get_brand("Lanco").get_inactives,
      Wilsonart: @items.get_brand("Wilsonart").get_inactives,
      Temar: @items.get_brand("Temar").get_inactives,
      Hafelle: @items.get_brand("Hafelle").get_inactives,
      Pfister: @items.get_brand("Pfister").get_inactives,
      Amana: @items.get_brand("Amana Tools").get_inactives,
      Eagle: @items.get_brand("Eagle Tools").get_inactives,
      Blum: @items.get_brand("Blum").get_inactives,
      Sait: @items.get_brand("Sait").get_inactives,
      "3M": @items.get_brand("3M").get_inactives,
      Todo: @items.remove_category("PVC").remove_category("Tornillos").remove_category("Tinte").remove_category("Goznes").remove_category("Correderas").remove_category("Routers").remove_category("Tapcon").remove_category("Staples").remove_category("Laminados").remove_brand("Sait").get_inactives,
      PVC: @items.get_category("PVC").get_inactives,
      Herramientas: @items.get_category("Herramientas").get_inactives,
      Goznes: @items.get_category("Goznes").get_inactives,
      Tinte: @items.get_category("Tinte").get_inactives,
      Mezcladoras: @items.get_category("Mezcladoras").get_inactives,
      Tornillos: @items.get_category("Tornillos").get_inactives,
      Tiradores: @items.get_category("Tiradores").get_inactives,
      Correderas: @items.get_category("Correderas").get_inactives,
      Routers: @items.get_category("Routers").get_inactives,
      Tapcon: @items.get_category("Tapcon").get_inactives,
      Staples: @items.get_category("Staples").get_inactives,
      SeamFil: @items.get_category("SeamFil").get_inactives,
      Laminados: @items.get_category("Laminados").get_inactives
    } ,
    pic_urls: @pic_urls
    } }
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
  @item.destroy

  redirect_to items_path
end

private

def item_params
  params.require(:item).permit(:active, :name, :category, :brand, :size, :thickness, :color, :sold_price , :bought_price, :pic, :inventory, :stock_number)
end

end

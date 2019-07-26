class ItemsController < ApplicationController
    layout "hello_world"

    # before_action :redirect_if_not_signed_in, only: [:show, :new, :create, :update, :destroy]

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
          All: @items.remove_category("PVC").remove_category("Tornillos").remove_category("SeamFil").remove_category("Tinte").get_actives,
          PVC: @items.get_category("PVC").get_actives,
          Tinte: @items.get_category("Tinte").get_actives,
          SeamFil: @items.get_category("SeamFil").get_actives,
          Tornillos: @items.get_category("Tornillos").get_actives,
          Glue: @items.get_category("Glue").get_actives,
          Tools: @items.get_category("Tools").get_actives,
          Cement: @items.get_category("Cement").get_actives,
          Lacquer: @items.get_category("Lacquer").get_actives,
          Primer: @items.get_category("Primer").get_actives,
          Sealer: @items.get_category("Sealer").get_actives
        } ,
        inactives:{
          Lanco: @items.get_brand("Lanco").get_inactives,
          All: @items.remove_category("PVC").remove_category("Tornillos").remove_category("SeamFil").remove_category("Tinte").get_inactives,
          PVC: @items.get_category("PVC").get_actives,
          Tinte: @items.get_category("Tinte").get_actives,
          SeamFil: @items.get_category("SeamFil").get_actives,
          Tornillos: @items.get_category("Tornillos").get_actives,
          Glue: @items.get_category("Glue").get_inactives,
          Tools: @items.get_category("Tools").get_inactives,
          Cement: @items.get_category("Cement").get_inactives,
          Lacquer: @items.get_category("Lacquer").get_inactives,
          Primer: @items.get_category("Primer").get_inactives,
          Sealer: @items.get_category("Sealer").get_inactives
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
    params.require(:item).permit(:active, :name, :category, :brand, :size, :thickness, :color, :sold_price , :bought_price, :pic, :inventory)
                          # .merge(user_id: current_user.id)
  end

end

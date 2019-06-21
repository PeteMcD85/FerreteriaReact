class ItemsController < ApplicationController
    layout "hello_world"

    # before_action :redirect_if_not_signed_in, only: [:show, :new, :create, :update, :destroy]

  def index
    @items = Item.all
    @active_items = @items.get_actives.remove_category("PVC")
    @inactive_items = @items.get_inactives.remove_category("PVC")
    @categories = Item.distinct_categories
    respond_to do |format|
      format.html
      format.json { render json: {
        actives:{
          All: @items.get_actives.remove_category("PVC"),
          PVC: @items.get_category("PVC").get_actives,
          Glue: @items.get_category("Glue").get_actives,
          Tools: @items.get_category("Tools").get_actives,
          Cement: @items.get_category("Cement").get_actives,
          Lacquer: @items.get_category("Lacquer").get_actives,
          Primer: @items.get_category("Primer").get_actives,
          Sealer: @items.get_category("Sealer").get_actives
        } ,
        inactives:{
          All: @items.get_inactives.remove_category("PVC"),
          PVC: @items.get_category("PVC").get_inactives,
          Glue: @items.get_category("Glue").get_inactives,
          Tools: @items.get_category("Tools").get_inactives,
          Cement: @items.get_category("Cement").get_inactives,
          Lacquer: @items.get_category("Lacquer").get_inactives,
          Primer: @items.get_category("Primer").get_inactives,
          Sealer: @items.get_category("Sealer").get_inactives
        }
        } }
    end
  end # END of index Method

  def show
    @item = Item.find(params[:id])
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
    params.require(:item).permit(:active, :name, :category, :brand, :size, :thickness, :color, :price)
                          # .merge(user_id: current_user.id)
  end

end

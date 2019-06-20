class ItemsController < ApplicationController
    layout "hello_world"

    # before_action :redirect_if_not_signed_in, only: [:show, :new, :create, :update, :destroy]

  def index
    @items = Item.all
    @categories = Item.distinct_categories
    respond_to do |format|
      format.html
      format.json { render json: {
        PVC: @items.get_category("PVC"),
        Glue: @items.get_category("Glue"),
        Tools: @items.get_category("Tools"),
        Cement: @items.get_category("Cement"),
        Lacquer: @items.get_category("Lacquer"),
        Primer: @items.get_category("Primer"),
        Sealer: @items.get_category("Sealer")
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

class ItemsController < ApplicationController
    layout "hello_world"
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

end

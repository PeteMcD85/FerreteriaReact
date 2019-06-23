module ItemsHelper

  def display_image(item)
    image_tag(url_for(item.pic)) if item.pic.attached?
  end

end

# <% if @item.pic.attached? %>
#   <image src="<%=url_for(@item.pic)%>" />
# <% end %>

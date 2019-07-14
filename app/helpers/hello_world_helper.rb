module HelloWorldHelper

  def display_user_sign_in(user_signed_in)
    if user_signed_in
      render 'shared_partials/user_signed_in'
    else
      content_tag(:div, link_to("Login", new_user_session_path))
    end
  end

end

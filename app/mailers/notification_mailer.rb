class NotificationMailer < ApplicationMailer
  def price_notification_email
    @item = params[:tracked_item]

    @user = @item.user

    @price = @item.latest_query.price

    mail(to: @user.email, from: 'Jeff Bezos <amazonalertsystem@gmail.com>', subject: "#{@item.name.capitalize} just dropped below $#{@item.threshold}!")
  end
end

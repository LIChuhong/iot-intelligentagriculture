<!-- 用户组件 -->
<template>
	<div ref="ezuikt11">
		<EZUIKitJs :et-wide-high="etWideHigh"></EZUIKitJs>
		<div>
			<div id="btnBgDiv" style="width: 210px;height: 210px;border-radius: 50%;background: #BFC7D3;position: relative;margin:1.25rem auto;">
				<div style="position: absolute;width: 70px;height: 70px;top:0;left:70px;">
					<Icon size="50" type="md-arrow-dropup" style="margin:0px 10px 20px 10px;" />
				</div>

				<div style="position: absolute;width: 70px;height: 70px;bottom:0;left:70px;">
					<Icon size="50" type="md-arrow-dropdown" style="margin:20px 10px 0px 10px;" />
				</div>

				<div style="position: absolute;width: 70px;height: 70px;top:70px;right:0;">
					<Icon size="50" type="md-arrow-dropright" style="margin:10px 0px 10px 20px;" />
				</div>
				<div style="position: absolute;width: 70px;height: 70px;top:70px;left:0;">
					<Icon size="50" type="md-arrow-dropleft" style="margin:10px 20px 10px 0px;" />
				</div>

				<div style="position: absolute;width: 70px;height: 70px;border-radius: 50%;background: #F5871F;left:70px;top:70px;z-index: 200;touch-action: none;"
				 id="btnDiv" @touchstart="touchstartView">
				</div>
			</div>

		</div>
	</div>

</template>

<script>
	// import axios from 'axios'
	// import ResetPwd from '@/view/mVending-machine/m-user-management/components/reset-pwd.vue'
	// import {
	// 	controlYsOpen
	// } from '@/api/rtu'
	import $ from 'jquery'
	import EZUIKitJs from '@/view/components/EZUIKitJs.vue'
	export default {
		components: {
			// ResetPwd
			EZUIKitJs
		},
		data() {
			return {
				flags: false,
				etWideHigh: {
					w: 300,
					h: 200
				},
			}
		},
		directives: {
			drag(el, bindings) {
				el.touchstart = function(e) {

					// let mapHeight = document.getElementById('btnBgDiv').offsetHeight;
					// let mapWidth = document.getElementById('btnBgDiv').offsetWidth;
					let disx = e.clientX - el.offsetLeft;
					let disy = e.clientY - el.offsetTop;
					// console.log('disx:'+disx)

					document.ontouchmove = function(e) {
						//通过事件委托，计算移动的距离
						// console.log('l:' + el.style.left)
						// console.log('t:' + el.style.top)
						var lLeft = parseFloat(el.style.left)
						var tTop = parseFloat(el.style.top)
						if (lLeft < 140 && lLeft > 0 && tTop < 140 && tTop > 0) {
							let l = e.clientX - disx;
							let t = e.clientY - disy;
							//移动当前元素
							el.style.left = l + "px";
							el.style.top = t + "px";


						}

						// console.log('l:'+el.style.left)
						// console.log('t:'+el.style.top)
						// el.style.left = (e.clientX - disx) / mapWidth * 100 + '%';
						// el.style.top = (e.clientY - disy) / mapHeight * 100 + '%';
					}
					document.ontouchend = function() {
						// var lLeft = parseFloat(el.style.left)
						// var tTop = parseFloat(el.style.top)

						document.ontouchmove = document.ontouchend = null;
					}
				}
			},

		},
		computed: {

		},
		methods: {
			controlYsOpen(direction) {
				var accessToken = 'at.c53bra70c34o68zxb9inx6x7blhmwm4y-54w6bdnl88-1y6m3k0-lb0v6jgpn'
				var deviceSerial = 'E38539884'
				var channelNo = 1
				$.ajax({
					url: "https://open.ys7.com/api/lapp/device/ptz/start",
					type: "post",
					data: {
						accessToken: accessToken,
						deviceSerial: deviceSerial,
						channelNo: 1,
						direction: direction,
						speed: 1
					},
					success: function(res) {
						// alert(res.geocodes[0].formatted_address + "经纬度：" + res.geocodes[0].location);
						console.log(res); //在console中查看数据
					},
					error: function(error) {
						console.log(error)
						// alert('failed!');
					},
				});
			},
			controlYsDown(direction) {
				var accessToken = 'at.c53bra70c34o68zxb9inx6x7blhmwm4y-54w6bdnl88-1y6m3k0-lb0v6jgpn'
				var deviceSerial = 'E38539884'
				var channelNo = 1
				$.ajax({
					url: "https://open.ys7.com/api/lapp/device/ptz/stop",
					type: "post",
					data: {
						accessToken: accessToken,
						deviceSerial: deviceSerial,
						channelNo: 1,
						direction: direction,
						speed: 1
					},
					success: function(res) {
						// alert(res.geocodes[0].formatted_address + "经纬度：" + res.geocodes[0].location);
						console.log(res); //在console中查看数据
					},
					error: function(error) {
						console.log(error)
						// alert('failed!');
					},
				});
			},
			getEtWideHigh() {
				var w = this.$refs.ezuikt11.offsetWidth
				var h = 300
				// alert(22)
				this.etWideHigh = {
					w: w,
					h: h
				}
				// console.log(1+this.etWideHigh)

				// alert(JSON.stringify(this.etWideHigh))
			},
			setBorderColor(borderDirection, color, colorDir) {
				document.getElementById('btnBgDiv').style.border = ''
				document.getElementById('btnBgDiv').style[borderDirection] = color
				document.getElementById('btnBgDiv').style.boxShadow = colorDir + ' ' + color + ' ' + 'inset'
			},
			touchstartView(event) {
				// console.log(event)
				var index = -1
				var that = this
				that.flags = true;
				var touch;
				if (event.touches) {
					touch = event.touches[0];
				} else {
					touch = event;
				}
				let disx = touch.clientX - document.getElementById('btnDiv').offsetLeft;
				let disy = touch.clientY - document.getElementById('btnDiv').offsetTop;
				document.ontouchmove = function(event) {
					if (that.flags) {
						var touch;
						if (event.touches) {
							touch = event.touches[0];
						} else {
							touch = event;
						}

						var lLeft = parseFloat(document.getElementById('btnDiv').style.left)
						var tTop = parseFloat(document.getElementById('btnDiv').style.top)
						if (lLeft < 140 && lLeft > 0 && tTop < 140 && tTop > 0) {
							let l = touch.clientX - disx;
							let t = touch.clientY - disy;
							//移动当前元素
							document.getElementById('btnDiv').style.left = l + "px";
							document.getElementById('btnDiv').style.top = t + "px";
							if (l >= 140) {
								document.getElementById('btnDiv').style.left = '139px'
							}
							if (l <= 0) {
								document.getElementById('btnDiv').style.left = '1px'
							}
							if (t >= 140) {
								document.getElementById('btnDiv').style.top = '139px'
							}
							if (t <= 0) {
								document.getElementById('btnDiv').style.top = '1px'
							}


							var t1 = parseFloat(document.getElementById('btnDiv').style.top)
							var l1 = parseFloat(document.getElementById('btnDiv').style.left)
							console.log('t:' + t1)
							console.log('l:' + l1)
							// console.log(document.getElementById('btnDiv').style)
							if (t1 == 1 && l1 >= 50 && l1 <= 90) {
								console.log('正上0')
								that.setBorderColor('borderTop', '#F5871F', '0px 10px 10px 1px')
								if (index != 0) {
									that.controlYsDown(index)
									that.controlYsOpen(0)
									index = 0
								}

								// that.controlYsDown(2)
							}
							if (t1 == 139 && l1 >= 50 && l1 <= 90) {
								console.log('正下1')
								that.setBorderColor('borderBottom', '#F5871F', '0px -10px 10px 1px')
								if (index != 1) {
									that.controlYsDown(index)
									that.controlYsOpen(1)
									index = 1
								}

								// that.controlYsDown(2)
							}
							if (l1 == 1 && t1 >= 50 && t1 <= 90) {
								console.log('正左2')
								that.setBorderColor('borderLeft', '#F5871F', '10px 0px 10px 1px')
								if (index != 2) {
									that.controlYsDown(index)
									that.controlYsOpen(2)
									index = 2
								}

								// that.controlYsDown(2)
							}
							if (l1 == 139 && t1 >= 50 && t1 <= 90) {
								console.log('正右3')
								that.setBorderColor('borderRight', '#F5871F', '-10px 0px 10px 1px')
								if (index != 3) {
									that.controlYsDown(index)
									that.controlYsOpen(3)
									index = 3
								}

								// document.getElementById('btnBgDiv').style.borderRight = '0.0625rem solid #F5871F'
								// document.getElementById('btnBgDiv').style.boxShadow = '-10px 0px 10px 1px #F5871F inset'

								// that.controlYsDown(2)
							}
							if (t1 == 1 && l1 == 1) {
								console.log('左上4')
								if (index != 4) {
									that.controlYsDown(index)
									that.controlYsOpen(4)
									index = 4
								}

							}
							if (t1 == 139 && l1 == 1) {
								console.log('左下5')
								if (index != 5) {
									that.controlYsDown(index)
									that.controlYsOpen(5)
									index = 5
								}

							}
							if (t1 == 1 && l1 == 139) {
								console.log('右上6')
								if (index != 6) {
									that.controlYsDown(index)
									that.controlYsOpen(6)
									index = 6
								}

							}
							if (t1 == 139 && l1 == 139) {
								console.log('右下7')
								if (index != 7) {
									that.controlYsDown(index)
									that.controlYsOpen(7)
									index = 7
								}

							}

						}

						//阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
						document.addEventListener("touchmove", function() {
							event.preventDefault();
						}, false);
					}

				};
				document.ontouchend = function() {
					that.controlYsDown(index)
					// that.controlYsOpen()
					document.getElementById('btnBgDiv').style.border = ""
					document.getElementById('btnBgDiv').style.boxShadow = ""
					document.getElementById('btnDiv').style.left = 70 + "px";
					document.getElementById('btnDiv').style.top = 70 + "px";
					that.flags = false;

				}

			},

		},
		mounted() {
			// console.log(axios)
			// this.controlYsOpen()


			this.getEtWideHigh()
			// controlYsOpen(accessToken,deviceSerial,channelNo,1,1)
		},
	}
</script>

<style>
</style>

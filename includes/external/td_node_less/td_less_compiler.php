<?php
/**
 * Used only on dev! - it is removed from the package by our deploy ;)
 * V2.0
 */



class td_less_compiler {

	static $compiler_cmd = 'includes\external\td_node_less\node.exe includes\external\td_node_less\lessjs\bin\lessc';



	/**
	 * STOP!
	 *
	 * WARNING!!!   This file and function is also used by the deploy system of the theme and it's not included with the deployed theme
	 *
	 * Compiles and imports a less file. It is used by the theme in the dev mode ONLY. The deploy system uses the @see td_less_compiler::compile_less_file not this function.
	 * @param $source
	 * @param $destination
	 */
	public static function compile_and_import($source, $destination) {
		$response = self::compile_less_file($source, $destination);
		if ($response === true) {
			header('Content-type: text/css');
			echo "@import url('$destination');";



			// status report
			echo PHP_EOL . PHP_EOL . '/*' . PHP_EOL . PHP_EOL;

			echo 'status: Compiled OK!' .  PHP_EOL . PHP_EOL;

			// show the full url of the compiled .css
			echo 'compiled file full path (can be opened in browser):' . PHP_EOL;
			$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
			echo dirname ($actual_link) . '/' . $destination . PHP_EOL;


			// show the less source
			echo PHP_EOL . PHP_EOL . 'less source: ' . PHP_EOL . $source . PHP_EOL;

			echo PHP_EOL . '*/';
		}
	}



	static function compile_less_file($source, $destination) {
		if (file_exists($destination)) {
			// if the file is in used, try 10 times with 1 seconds delay
			for ( $i = 0 ; $i < 10; $i++) {
				$unlink_status = @unlink($destination);   // this returns false if the file is in use
				if ($unlink_status === true) {
					break;
				}
				sleep(1);
			}
		}


		$cmd = self::$compiler_cmd . ' "' . $source . '" "' . $destination . '" --no-color';
		$descriptorspec = array(
			0 => array("pipe", "r"), // STDIN
			1 => array("pipe", "w"), // STDOUT
			2 => array("pipe", "w"), // STDERR
		);
		$cwd = getcwd();
		$env = null;
		$proc = proc_open($cmd, $descriptorspec, $pipes, $cwd, $env);
		if (is_resource($proc)) {
			$stdout = stream_get_contents($pipes[1]);
			$stderr = stream_get_contents($pipes[2]);
			$return_status = proc_close($proc);

			if ($return_status == 1) {
				// error
				echo '<pre>' . $stderr . '</pre>';
				die;
			} else {
				// everything worked ok
				return true;
			}


//                // Output test:
//                echo "STDOUT:<br />";
//                echo "<pre>".$stdout."</pre>";
//                echo "STDERR:<br />";
//                echo "<pre>".$stderr."</pre>";
//				echo "Exited with status: $return_status";
		} else {
			echo 'td_error: no resource';
			die;
		}
	}
}























